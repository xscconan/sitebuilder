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