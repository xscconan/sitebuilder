var Handler = require('../../../../meta/HttpHandler.js');
var ShareUtils = require('../../../../public/sharedJs/libs/utils.js').Utils;
var dbHandlers = require("../../../../storge/model/MongoHander.js");
var VSiteDBCtrl = require('../../pageBoard/controller/vsiteDbController.js');

var db = require("../../../../storge/db/db.js");

exports.HttpHandler = HttpHandler = function(){};
HttpHandler.prototype = new Handler.HttpHandler();

HttpHandler.prototype.onHandle = function(req, res, callbackFun){
	var accountId =  req.session.user.uuid;
	var siteId = req.body.siteId;

	// var VSiteModel = VSiteDBCtrl.getVSiteModel();

	// var conditions = {
	// 	"accountId" : accountId,
	// 	"vsites.vsiteId" : siteId
	// };

	// var delHandlerInfo = new dbHandlers.DelHandlerInfo(
	// 	conditions,
	// 	function(data){
	// 		callbackFun(data);
	// 	});

	// db.remove(VSiteModel, delHandlerInfo);


	var VSiteModel = VSiteDBCtrl.getVSiteModel();

	var updateHandlerInfo = new dbHandlers.UpdateHandlerInfo(
		"update",
		{"accountId" : accountId},
		{$pull : {"vsites" : {"vsiteId" : siteId}}},
		function(err, doc){
			if (!err && doc == 1)
			{
				callbackFun("1");
			}
			else
			{
				console.log(err);
				callbackFun("0");
			}
		}
	);

	db.update(VSiteModel, updateHandlerInfo);
};