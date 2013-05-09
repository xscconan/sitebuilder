var CONF =  require('../../config/CONFIG.json');

var DB_TYPE = {
	'MYSQL_DB' : 'mysql',
	'MANGO_DB' : 'mongo'
};

var _addGlobalDb = function(db){
	global.db = db;
};

var _cleanDBtrush = function(err){
	console.log("###### SB Server connected fail! ######");
	console.log(err);
	// global.Log.write('error', "[DB Error] ###### SB Server connected fail! ###### \n %s",err);
	global.db = null;
}

exports.init = function(){
	if (!CONF.db.enable)
		return;

	global.db = null;
	exports.dbFactory().init(CONF.db, function(err, db) {
		if (err)
			_cleanDBtrush(err);
		else
			_addGlobalDb(db);
	});
};

exports.dbFactory = function(){
	var dbMode =  null;
	switch (CONF.db.dbType)
	{
		case DB_TYPE.MYSQL_DB: 
			dbMode =  require('./mysql.js');
			break;
		case DB_TYPE.MANGO_DB:
			dbMode = require('./mongo.js');
			break;
	}
	return dbMode;
};


var _dbOperator = function(method,arg){
	if (!!global.db)
		exports.dbFactory()[method](global.db, arg[0], arg[1], arg[2]); 
	else
		_cleanDBtrush('DB not connected!');		
};



//Parameters in js arguments
//sql db arguments: sql, param, callbackFun
//nosql db arguments: dbEntity, handlerInfo
exports.read = function(){
	_dbOperator('read', arguments);		
};

//sql db arguments: sql, param
//nosql db arguments: dbEntity, callbackFun
exports.write = function(){
	_dbOperator('write', arguments);
};

//sql db arguments: sql, param
//nosql db arguments: dbEntity, handlerInfo
exports.update = function(){
	_dbOperator('update', arguments);
};

//sql db arguments: sql, param
//nosql db arguments: dbModel, handlerInfo
exports.remove = function(){
	_dbOperator('remove', arguments);
};