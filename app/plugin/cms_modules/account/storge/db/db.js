var CONF =  require('../../config.json');
var dbMode =  require('../../../../../storge/db/mysql.js');
var crypto = require('crypto');

var _addGlobalDb = function(db){
	global.accountDb = db;
	console.log('account plugin db init!');
};

var _cleanDBtrush = function(err){
	console.log("###### Account Plugin SB Server connected fail! ######");
	console.log(err);
	// global.Log.write('error', "[Account Plugin DB Error] ###### SB Server connected fail! ###### \n %s",err);
	global.accountDb = null;
}

exports.init = function(){
	// console.log(crypto.createHash('md5').update('123789'+ 'xsc').digest('hex') );
	global.accountDb = null;
	dbMode.init(CONF.db, function(err, db) {
		if (err)
			_cleanDBtrush(err);
		else
			_addGlobalDb(db);
	});
};


var _dbOperator = function(method,arg){
	if (!!global.accountDb)
		dbMode[method](global.accountDb, arg[0], arg[1], arg[2]); 
	else
		_cleanDBtrush('DB not connected!');
};



//Parameters in js arguments
//sql db arguments: sql, param, callbackFun
//nosql db arguments: dbEntity, callbackFun
exports.read = function(){
	_dbOperator('read', arguments);	
};

//sql db arguments: sql, param
//nosql db arguments: dbEntity
exports.write = function(){
	_dbOperator('write', arguments);
};

//sql db arguments: sql, param
//nosql db arguments: dbModel, handlerInfo
exports.update = function(){
	_dbOperator('update', arguments);
};

//sql db arguments: sql, param
//nosql db arguments: dbEntity
exports.remove = function(){
	_dbOperator('remove', arguments);
};