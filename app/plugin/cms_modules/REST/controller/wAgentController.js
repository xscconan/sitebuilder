var Handler = require('../../../../meta/HttpHandler.js');
var ShareUtils = require('../../../../public/sharedJs/libs/utils.js').Utils;
var CQDBCtrl = require('../../callQueue/controller/cqDbController.js');
var db = require("../../../../storge/db/db.js");

var dbHandlers = require("../../../../storge/model/MongoHandler.js");


exports.HttpHandler = HttpHandler = function(){};
HttpHandler.prototype = new Handler.HttpHandler();

var _doUpdateReferAgentInHub = function(_callHubId, _agentId){
		var CallHubModel = CQDBCtrl.getCallHubModel();
		
		var updateHandlerInfo = new dbHandlers.UpdateHandlerInfo(
			"update",
			{ "hubId": _callHubId },
			{$push:{ "agents" : _agentId}}
	);

	db.update(CallHubModel, updateHandlerInfo);
}

HttpHandler.prototype.onHandle = function(req, res, callbackFun){
	var _accountId =  req.session.user.uuid;
	var _agentId = ShareUtils.UUID();
	var _hubs = !!req.body.hubs? req.body.hubs: [];

	var _agentObj = {
		accountId : _accountId,
		agentId : _agentId,
		name :  req.body.name,
		phone: req.body.phone,
		email: req.body.email,
		skill: req.body.skill,
		hubs : _hubs,
		isSupervisor : req.body.isSupervisor
	};

	if (!!req.body.password)
		_agentObj.password = req.body.password;

	var AgentModel = CQDBCtrl.getAgentModel();

	var updateHandlerInfo = new dbHandlers.UpdateHandlerInfo(
		"update",
		{ "agentId": _agentObj.agentId},
		_agentObj,
		function(err, doc){
			if (!err && doc == 1)
			{
				_agentObj.created = "1";
				callbackFun(_agentObj);
				for (i in _hubs)
					_doUpdateReferAgentInHub(_hubs[i], _agentObj.agentId);
			}
			else
			{
				console.log(err);
				callbackFun("0");
			}
		},
		{upsert : true }
	);

	db.update(AgentModel, updateHandlerInfo);
};