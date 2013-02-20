var CONF =  require('../../config/CONFIG.json');
var mysql = require('mysql');


var _handleDisconnect = function (callBackFunction, db) {
	db.on('error', function(err) {
	    if (!err.fatal) {
	      return;
	    }

	    if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
	    	 global.Log.write('error','[DB Error]' + err.code);
	    }

	    global.Log.write('error', '[DB Re-connecting] lost connection: ' + err.stack);

	    db = mysql.createConnection(global.db.config);
	    _handleDisconnect(callBackFunction, db);

	    db.connect(function(err){
			callBackFunction(err, db);
		});
	  });
};

exports.init = function(callBackFunction)
{
	var option = {};
	option.host = CONF.db.dbHost;
	option.port =  CONF.db.dbPort;
	option.user =  CONF.db.dbUser;
	option.password =  CONF.db.dbPassword;
	option.database =  CONF.db.dbName;
	option.insecureAuth = true;
	option.debug = false;
	
	var _db = mysql.createConnection(option);
	_db.connect(function(err){
		callBackFunction(err, _db);
	});
	_handleDisconnect(callBackFunction, _db);

};

exports.read = function(sql, param, callbackFun){
	var query = global.db.query(sql, param, function(err, result) {
		if (!!err)
			global.Log.write('error', "[MYSQL READ]: %s [SQL]: %s" , err , query.sql);
		callbackFun(result);
	});
};

exports.write = function(sql, param){
	var query = global.db.query(sql, param, function(err) {
		if (!!err)
			global.Log.write('error', "[MYSQL WRITE]: %s [SQL]: %s" , err , query.sql);
	});
};

exports.update = function(sql, param){
	
};

exports.remove = function(sql, param){
	var query = global.db.query(sql, param, function(err) {
		if (!!err)
			global.Log.write('error', "[MYSQL DELETE]: %s [SQL]: %s" , err , query.sql);
	});
};