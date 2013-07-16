var Handler = require('../../../../meta/HttpHandler.js');
var ShareUtils = require('../../../../public/sharedJs/libs/utils.js').Utils;
var CQDBCtrl = require('../../callQueue/controller/cqDbController.js');
var db = require("../../../../storge/db/db.js");
var crypto = require('crypto');
var dbHandlers = require("../../../../storge/model/MongoHandler.js");


exports.HttpHandler = HttpHandler = function(){};
HttpHandler.prototype = new Handler.HttpHandler();

HttpHandler.prototype.onHandle = function(req, res, callbackFun){
	
	if (!!req.body.updateKey && !!req.body.agentId && req.body.updateKey != crypto.createHash('md5').update(req.body.agentId + "agent").digest("hex"))
	{
		callbackFun("0");
		return;
	}
	
	var _accountId =  req.session.user.uuid;
	var _agentId = (!!req.body.updateKey && !!req.body.agentId && req.body.agentId.length > 0)? req.body.agentId: ShareUtils.UUID();
	var _hubs = !!req.body.hubs? req.body.hubs: [];


	var _agentObj = {
		accountId : _accountId,
		agentId : _agentId,
		name :  req.body.name,
		phone: req.body.phone,
		email: req.body.email,
		skill: req.body.skill,
		hubs : _hubs,
		isSupervisor : req.body.isSupervisor,
		updateKey : crypto.createHash('md5').update(_agentId + "agent").digest("hex")
	};

	if (!!req.body.password)
		_agentObj.password = crypto.createHash('md5').update(req.body.password).digest("hex");

	var AgentModel = CQDBCtrl.getAgentModel();

	var updateHandlerInfo = new dbHandlers.UpdateHandlerInfo(
		"update",
		{ "email": _agentObj.email},
		_agentObj,
		function(err, doc){
			if (!err && doc == 1)
			{
				callbackFun(_agentObj);
				CQDBCtrl.updateAgentInHubs(_agentObj.agentId, _agentObj.hubs);
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