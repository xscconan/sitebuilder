var mongoose = require('mongoose');

exports.init = function(dbConf, callBackFunction)
{
	var connection = [];
	connection.push('mongodb://');
	connection.push(dbConf.dbUser);
	connection.push(':');
	connection.push(dbConf.dbPassword);
	connection.push('@');
	connection.push(dbConf.dbHost);
	connection.push(':');
	connection.push(dbConf.dbPort);
	connection.push('/');
	connection.push(dbConf.dbName);

	mongoose.connect(connection.join(''));

	var db = mongoose.connection;
	db.on('error', callBackFunction);
	db.once('open', function callback () {
	  	console.log('db connect!');
	});
	callBackFunction(null, db);
}

exports.write = function(db, dbEntity, callbackFun){
	dbEntity.save(function(err, docs){
		 callbackFun(err, docs);
	});
}

exports.read = function(db, dbModel, handlerInfo){
	try
	{
		dbModel[handlerInfo.updateMethod](handlerInfo.conditions, handlerInfo.fields, handlerInfo.options, function(err, doc) {
		  handlerInfo.callbackFun(err, doc);
		});
	}
	catch(e)
	{
		 handlerInfo.callbackFun(e);
		 console.log('read error');
	}
}

exports.update = function(db, dbModel, handlerInfo){
	try
	{
		dbModel[handlerInfo.updateMethod](handlerInfo.conditions, handlerInfo.updates, handlerInfo.options, function(err, doc) {
		  handlerInfo.callbackFun(err, doc);
		});
	}
	catch(e)
	{
	     console.log('update error');
		 handlerInfo.callbackFun(e);
	}
}

exports.remove = function(db, dbEntity, handlerInfo){
	try
	{
		dbEntity.remove(handlerInfo.conditions, function(err){
			if (!err)
				handlerInfo.callbackFun("1");
			else
				handlerInfo.callbackFun("0");
		});
	}
	catch(e)
	{
	     console.log('update error');
		 handlerInfo.callbackFun("0");
	}
}
