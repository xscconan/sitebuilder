var Handler = require('../../../../meta/HttpHandler.js');
var VSiteDBCtrl = require('../../pageBoard/controller/vsiteDbController.js');
var ShareUtils = require('../../../../public/sharedJs/libs/utils.js').Utils;


exports.HttpHandler = HttpHandler = function(){};
HttpHandler.prototype = new Handler.HttpHandler();


HttpHandler.prototype.onHandle = function(req, res, callbackFun){
	var accountId =  req.session.user.uuid;
	var siteId = req.body.siteId;

	var conditions = {
		"accountId" : accountId,
		"vsites.vsiteId" : siteId
	};

	var fields = {
		"vsites.$.vsiteId" : siteId
	};

	VSiteDBCtrl.findVSites(conditions, fields, function(err, doc){
		var returnData = {};
		returnData.vsites = doc[0].vsites;
		returnData.pageType = global.pageBoard.pageType;
		callbackFun(returnData);
	});
};