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
	var _vpageId = ShareUtils.UUID();

	var _vpageObj = {
		vsiteId : siteId,
		vpageId : _vpageId,
		title :  req.body.title,
		x : req.body.x,
		y : req.body.y,
		typeId : req.body.typeId,
		referEndNode : Array
	}

	var VSiteModel = VSiteDBCtrl.getVPageListModel();

	var updateHandlerInfo = new dbHandlers.UpdateHandlerInfo(
		"update",
		{ "vpageId": _vpageId },
		_vpageObj,
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
		},
		{upsert : true }
	);

	db.update(VSiteModel, updateHandlerInfo);
};