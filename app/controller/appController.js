var cluster = require('cluster');
var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();

var logCtr = require('./logController.js');
var sysUtils = require('../util/sysUtils.js');
var CONF = require('../config/config.json');
var ROUTER_ARRAY = require('../config/router.json');
var db = require("../storge/db/db.js");



var numCPUs = require('os').cpus().length;

var _pluginInit = function(){
	if (CONF.enablePlugin) {
		var pluginCtr = require('./pluginController.js');
		pluginCtr.modulesLoader(app);
	};
};

var _initHttpApp = function(){
	//configure for http listener
	app.configure(function(){
		app.set('views', __dirname + '/../viewTmp');
		app.set('view engine', 'jade');
		app.use(express.cookieParser());
		app.use(express.bodyParser());
		app.use(express.methodOverride());
		app.use(express.static(__dirname  + '/../public'));
		app.use(app.router);
		app.use(express.favicon(__dirname  + '/../public/favicon.ico'));
	});

	sysUtils.loadRouters(ROUTER_ARRAY, app, false);
};

//For http web service
var _startHttpListen = function(){
	var appHttp = sysUtils.getWSAppServ(app, false);
	var port = !!process.env.PORT ? process.env.PORT : CONF.wsPort;

	appHttp.listen(port);
};

exports.start = function(){
	if (CONF.enableCluster && cluster.isMaster) {
	  // Fork workers.
	  for (var i = 0; i < numCPUs; i++) {
	    cluster.fork();
	  }

	  cluster.on('exit', function(worker, code, signal) {
	  	console.log('worker ' + worker.process.pid + ' died');
	  });
	} else {
		logCtr.init();
		db.init();
		_initHttpApp();
		_pluginInit();
		_startHttpListen();
		console.log("Http Server Started, Worker id: " + process.pid);
	}
};

