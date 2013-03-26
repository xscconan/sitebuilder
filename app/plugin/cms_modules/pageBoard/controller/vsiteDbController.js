var Handler = require('../../../../meta/HttpHandler.js');
var _VSiteSchema = require('../dbSchema/VSiteSchema.js').VSiteSchema;
var Handlers = require("../../../../storge/model/MongoHander.js");
var db = require("../../../../storge/db/db.js");
var mongoose = require('mongoose');


exports.getVSiteModel = function(){
	var VSiteModel;

	try {
	    // Throws an error if "VPage" hasn't been registered
	    VSiteModel = global.db.model('VSite');
	} catch (e) {
		var VSiteSchema = new mongoose.Schema(_VSiteSchema);

    	VSiteModel = global.db.model('VSite',VSiteSchema);
	}

	return VSiteModel;
}

exports.findVSitesByAccountId = function(accountId, callbackFun){
	var conditions = {"accountId" : accountId};
	exports.findVSites(conditions, null, callbackFun);
};

exports.findVSites = function(conditions, fields, callbackFun){

	var VSiteModel = exports.getVSiteModel();

	var findHandlerInfo = new Handlers.FindHandlerInfo(
		"find",
		conditions,
		fields,
		function(err, doc){
		callbackFun(err, doc);
	});


	db.read(VSiteModel, findHandlerInfo);

}