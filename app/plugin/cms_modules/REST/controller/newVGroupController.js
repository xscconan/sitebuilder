var Handler = require('../../../../meta/HttpHandler.js');
var ShareUtils = require('../../../../public/sharedJs/libs/utils.js').Utils;
var VSiteDBCtrl = require('../../pageBoard/controller/vsiteDbController.js');
var db = require("../../../../storge/db/db.js");

var dbHandlers = require("../../../../storge/model/MongoHandler.js");


exports.HttpHandler = HttpHandler = function(){};
HttpHandler.prototype = new Handler.HttpHandler();

HttpHandler.prototype.onHandle = function(req, res, callbackFun){
	var accountId =  req.session.user.uuid;
	var siteId = req.body.siteId;
	var _vgroupId = ShareUtils.UUID();

	var _vgroupObj = {
		vsiteId : siteId,
		vgroupId : _vgroupId,
		title :  req.body.title,
		x : req.body.x,
		y : req.body.y
	}

	var VGroupModel = VSiteDBCtrl.getVGroupListModel();

	var updateHandlerInfo = new dbHandlers.UpdateHandlerInfo(
		"update",
		{ "vgroupId": _vgroupId },
		_vgroupObj,
		function(err, doc){
			if (!err && doc == 1)
			{
				_vgroupObj.created = "1";
				callbackFun(_vgroupObj);
			}
			else
			{
				console.log(err);
				callbackFun("0");
			}
		},
		{upsert : true }
	);

	db.update(VGroupModel, updateHandlerInfo);
};