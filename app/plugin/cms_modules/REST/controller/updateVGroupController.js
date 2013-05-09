var Handler = require('../../../../meta/HttpHandler.js');
var VSiteDBCtrl = require('../../pageBoard/controller/vsiteDbController.js');
var ShareUtils = require('../../../../public/sharedJs/libs/utils.js').Utils;

var db = require("../../../../storge/db/db.js");

var dbHandlers = require("../../../../storge/model/MongoHandler.js");

exports.HttpHandler = HttpHandler = function(){};
HttpHandler.prototype = new Handler.HttpHandler();


HttpHandler.prototype.onHandle = function(req, res, callbackFun){
	var accountId =  req.session.user.uuid;
	var siteId = req.body.siteId;
	var vgroupId = req.body.vgroupId;
	var conditions = {
		"vsiteId" : siteId,
		"vgroupId" : vgroupId
	};

	var _vgroupObj = {}
	if (!!req.body.title)
		_vgroupObj.title =  req.body.title;

	if (!!req.body.x)
		_vgroupObj.x = req.body.x;

	if (!!req.body.y)
		_vgroupObj.y = req.body.y;

	if (!!req.body.vpagesBtns)
		_vgroupObj.vpagesBtns = req.body.vpagesBtns;
	

	var VGroupListModel = VSiteDBCtrl.getVGroupListModel();

	var updateHandlerInfo = new dbHandlers.UpdateHandlerInfo(
		"update",
		conditions,
		{$set : _vgroupObj},
		function(err, doc){
			if (!err)
			{
				_vgroupObj.vsiteId = siteId;
				_vgroupObj.vgroupId = vgroupId;
				_vgroupObj.created = "1";
				callbackFun(_vgroupObj);
			}
			else
			{
				console.log(err);
				callbackFun("0");
			}
		}
	);

	db.update(VGroupListModel, updateHandlerInfo);
};