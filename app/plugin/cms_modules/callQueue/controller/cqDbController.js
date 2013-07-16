var Handler = require('../../../../meta/HttpHandler.js');
var CQ = require('../dbSchema/CallQueueSchema.js').CQ;
var dbHandlers = require("../../../../storge/model/MongoHandler.js");
var db = require("../../../../storge/db/db.js");
var mongoose = require('mongoose');


exports.getAgentModel = function(){
	return dbHandlers.getModel('Agent', CQ.Agent);
};

exports.getCallHubModel = function(){
	return dbHandlers.getModel('CallHub', CQ.CallHub);
};

exports.getAgentsInHubModel = function(){
	return dbHandlers.getModel('AgentsInHub', CQ.AgentsInHub);
};

exports.getAgReferData = function(conditions, agFields, callbackFun){
	var agentRefer = {};
	exports.getCallHub(conditions, function(err, hubs){
		agentRefer.hubs = hubs;
		exports.getAgents(conditions, agFields, function(err, agents){
			agentRefer.agents = agents;
			callbackFun(err, agentRefer);
		});
	});
};

exports.getCallHub = function(conditions, callbackFun){
	var CallHubModel = exports.getCallHubModel();

	var findHandlerInfo = new dbHandlers.FindHandlerInfo(
		"find",
		conditions,
		null,
		function(err, doc){
		callbackFun(err, doc);
	});

	db.read(CallHubModel, findHandlerInfo);
}

exports.getAgents = function(conditions, fields, callbackFun){
	var CallHubModel = exports.getAgentModel();

	var findHandlerInfo = new dbHandlers.FindHandlerInfo(
		"find",
		conditions,
		fields,
		function(err, doc){
		callbackFun(err, doc);
	});

	db.read(CallHubModel, findHandlerInfo);
}

exports.updateAgentInHubs = function(_agentId, _hubs){
	var AgentInHubsModel = exports.getAgentsInHubModel();

	var delHandlerInfo = new dbHandlers.DelHandlerInfo(
		{agentId : _agentId},
		function(data)
		{
			if (data == "1")
			{
				for (i in _hubs)
				{
					var AgentInHubsEntity = new AgentInHubsModel({agentId : _agentId, hubId : _hubs[i]});
					db.write(AgentInHubsEntity);
				}
			}
		});

	db.remove(AgentInHubsModel, delHandlerInfo);

	
		
}