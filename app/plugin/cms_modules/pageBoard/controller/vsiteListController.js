var Handler = require('../../../../meta/HttpHandler.js');
var VSiteDBCtrl = require('./vsiteDbController.js');

exports.HttpHandler = HttpHandler = function(){};
HttpHandler.prototype = new Handler.HttpHandler();

HttpHandler.prototype.title = 'create voice site';

HttpHandler.prototype.onHandle = function(req, res, callbackFun){
	var accountId =  req.session.user.uuid;
	VSiteDBCtrl.findVSitesByAccountId(accountId, function(err, doc){
		callbackFun(doc[0]);
	});

};