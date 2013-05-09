var Handler = require('../../../../meta/HttpHandler.js');
var CQDBCtrl = require('../../callQueue/controller/cqDbController.js');
var ShareUtils = require('../../../../public/sharedJs/libs/utils.js').Utils;


exports.HttpHandler = HttpHandler = function(){};
HttpHandler.prototype = new Handler.HttpHandler();


HttpHandler.prototype.onHandle = function(req, res, callbackFun){

	var conditions = {
		"accountId" : req.session.user.uuid
	};

	var agFields = 'agentId name phone email skill isSupervisor hubs';

	CQDBCtrl.getAgReferData(conditions, agFields, function(err, doc){
		if (!!err || !doc)
			callbackFun("0");
		else
			callbackFun(doc);
	});


};