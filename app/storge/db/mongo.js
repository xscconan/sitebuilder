var mongoose = require('mongoose');
var CONF =  require('../../config/CONFIG.json');

exports.init = function(callBackFunction)
{
	var connection = [];
	connection.push('mongodb://');
	connection.push(CONF.db.dbUser);
	connection.push(':');
	connection.push(CONF.db.dbPassword);
	connection.push('@');
	connection.push(CONF.db.dbHost);
	connection.push(':');
	connection.push(CONF.db.dbPort);
	connection.push('/');
	connection.push(CONF.db.dbName);

	mongoose.connect(connection.join(''));

	var db = mongoose.connection;
	db.on('error', callBackFunction);
	db.once('open', function callback () {
	  	console.log('db connect!');
	});
	callBackFunction(null, db);
}

exports.write = function(dbEntity){
	dbEntity.save();
}

exports.read = function(dbModel, callbackFun){
	dbModel.find({},function(err, result){
		if (!!err)
			global.Log.write('error', "[MYSQL READ]: %s" , err);
		callbackFun(err, result);
	});
}