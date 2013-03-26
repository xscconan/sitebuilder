var Handler = require('../../../../meta/HttpHandler.js');
var ShareUtils = require('../../../../public/sharedJs/libs/utils.js').Utils;
var VSiteDBCtrl = require('../../pageBoard/controller/vsiteDbController.js');
var db = require("../../../../storge/db/db.js");

var dbHandlers = require("../../../../storge/model/MongoHander.js");


exports.HttpHandler = HttpHandler = function(){};
HttpHandler.prototype = new Handler.HttpHandler();

HttpHandler.prototype.onHandle = function(req, res, callbackFun){
	var accountId =  req.session.user.uuid;
	var siteId = req.body.siteId;

	var _vpageObj = {
		vpageId : ShareUtils.UUID(),
		title :  req.body.title,
		x : req.body.x,
		y : req.body.y,
		typeId : req.body.typeId
	}


	var VSiteModel = VSiteDBCtrl.getVSiteModel();

	var updateHandlerInfo = new dbHandlers.UpdateHandlerInfo(
		"update",
		{"accountId" : accountId, "vsites.vsiteId": siteId },
		{$push : {"vsites.$.vpages" : _vpageObj} },
		function(err, doc){
			if (!err && doc == 1)
			{
				_vpageObj.created = "1";
				callbackFun(_vpageObj);
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