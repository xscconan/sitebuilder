var fs = require('fs');
var CONF = require('../config/config.json');
var path = require('path');

exports.getWSAppServ = function(app, isSSL)
{
	var https = require('https');
	var http = require('http');
	var options = false;

	if (isSSL && CONF.SSL.enableSSL)
	{
		options = {
				  	key: fs.readFileSync(CONF.SSL.sslKey),
				  	cert: fs.readFileSync(CONF.SSL.sslCert),
				  	requestCert: true,
				  	passphrase : CONF.SSL.passphrase,
				  	ca : fs.readFileSync(CONF.SSL.sslCA)
				};
		return https.createServer(options, app);
	}
	return http.createServer(app);
};

exports.loadRouters = function(ROUTER_ARRAY, httpApp, isModuleRouter, moduleName)
{
	//init express router
	for (_routerPath in ROUTER_ARRAY)
	{
		var _method = ROUTER_ARRAY[_routerPath].method;

		httpApp[_method](_routerPath, function(req, res){
			var _routerName = ROUTER_ARRAY[req.route.path].name;
			var file = null;
			if (!isModuleRouter)
				file = path.resolve(__dirname,'../controller/webPageController/')+ "/"+ _routerName +'Controller.js';
			else
				file = path.resolve(__dirname,'../plugin/cms_modules/')+ "/"+ moduleName + '/controller/'+ _routerName +'Controller.js';

			if (!!file && fs.existsSync(file))
			{
				var Handler = require(file);
				_httpHandle = new Handler.HttpHandler();

				_httpHandle.handleRequest(req, res, function(_assigedViewData){
					var jadeFile = _routerName + '.jade';
					if (isModuleRouter)
						jadeFile = './cms_modules_views/' + moduleName + '/' + jadeFile;

					res.render(jadeFile, _assigedViewData);
				});
			}
		});
	}
};