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

	    db = mysql.createConnection(db.config);
	    _handleDisconnect(callBackFunction, db);

	    db.connect(function(err){
			callBackFunction(err, db);
		});
	  });
};

exports.init = function(dbConf, callBackFunction)
{
	var option = {};
	option.host = dbConf.dbHost;
	option.port =  dbConf.dbPort;
	option.user =  dbConf.dbUser;
	option.password =  dbConf.dbPassword;
	option.database = dbConf.dbName;
	option.insecureAuth = true;
	option.debug = false;
	
	var _db = mysql.createConnection(option);
	_db.connect(function(err){
		callBackFunction(err, _db);
	});
	_handleDisconnect(callBackFunction, _db);

};

exports.read = function(db, sql, param, callbackFun){
	var query = db.query(sql, param, function(err, result) {
		if (!!err)
			global.Log.write('error', "[MYSQL READ]: %s [SQL]: %s" , err , query.sql);
		callbackFun(result);
	});
};

exports.write = function(db, sql, param){
	var query = db.query(sql, param, function(err) {
		if (!!err)
			global.Log.write('error', "[MYSQL WRITE]: %s [SQL]: %s" , err , query.sql);
	});
};

exports.update = function(db, sql, param){
	
};

exports.remove = function(db, sql, param){
	var query = db.query(sql, param, function(err) {
		if (!!err)
			global.Log.write('error', "[MYSQL DELETE]: %s [SQL]: %s" , err , query.sql);
	});
};