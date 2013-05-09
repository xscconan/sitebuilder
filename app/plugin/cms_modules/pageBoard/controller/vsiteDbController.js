var Handler = require('../../../../meta/HttpHandler.js');
var _SiteBuildSchema = require('../dbSchema/VSiteSchema.js').SiteBuild;
var dbHandlers = require("../../../../storge/model/MongoHandler.js");
var db = require("../../../../storge/db/db.js");

exports.getVSiteModel = function(){
	return dbHandlers.getModel('VSite', _SiteBuildSchema.VSiteSchema);
};

exports.getVPageListModel = function(){
	return dbHandlers.getModel('VPageList', _SiteBuildSchema.VPageListSchema);
};

exports.getVGroupListModel = function(){
	return dbHandlers.getModel('VGroupList', _SiteBuildSchema.VGroupListSchema);
};

exports.findVSitesByAccountId = function(accountId, callbackFun){
	var conditions = {"accountId" : accountId};
	exports.findVSites(conditions, null, callbackFun);
};

exports.findVSites = function(conditions, fields, callbackFun){

	var VSiteModel = exports.getVSiteModel();

	var findHandlerInfo = new dbHandlers.FindHandlerInfo(
		"find",
		conditions,
		fields,
		function(err, doc){
		callbackFun(err, doc);
	});

	db.read(VSiteModel, findHandlerInfo);
};

exports.findVPageList = function(conditions, fields, callbackFun){

	var VPageListModel = exports.getVPageListModel();

	var findHandlerInfo = new dbHandlers.FindHandlerInfo(
		"find",
		conditions,
		fields,
		function(err, doc){
		callbackFun(err, doc);
	});


	db.read(VPageListModel, findHandlerInfo);
};

exports.findVGroupList = function(conditions, fields, callbackFun){

	var VGroupListModel = exports.getVGroupListModel();

	var findHandlerInfo = new dbHandlers.FindHandlerInfo(
		"find",
		conditions,
		fields,
		function(err, doc){
		callbackFun(err, doc);
	});


	db.read(VGroupListModel, findHandlerInfo);
};