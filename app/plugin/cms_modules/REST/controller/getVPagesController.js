var Handler = require('../../../../meta/HttpHandler.js');
var VSiteDBCtrl = require('../../pageBoard/controller/vsiteDbController.js');
var ShareUtils = require('../../../../public/sharedJs/libs/utils.js').Utils;


exports.HttpHandler = HttpHandler = function(){};
HttpHandler.prototype = new Handler.HttpHandler();


HttpHandler.prototype.onHandle = function(req, res, callbackFun){
	var siteId = req.body.siteId;

	var conditions = {
		"vsiteId" : siteId
	};

	VSiteDBCtrl.findVPageList(conditions, null, function(err, doc){
		var returnData = {};
		returnData.vpageList = doc;
		returnData.pageType = global.pageBoard.pageType;
		callbackFun(returnData);
	});
};