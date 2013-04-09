var Handler = require('../../../../meta/HttpHandler.js');
var VSiteDBCtrl = require('../../pageBoard/controller/vsiteDbController.js');
var ShareUtils = require('../../../../public/sharedJs/libs/utils.js').Utils;

var db = require("../../../../storge/db/db.js");

var dbHandlers = require("../../../../storge/model/MongoHander.js");

exports.HttpHandler = HttpHandler = function(){};
HttpHandler.prototype = new Handler.HttpHandler();


HttpHandler.prototype.onHandle = function(req, res, callbackFun){
	var accountId =  req.session.user.uuid;
	var siteId = req.body.siteId;
	var vpageId = req.body.vpageId;
	var conditions = {
		"vsiteId" : siteId,
		"vpageId" : vpageId
	};

	var _vpageObj = {
		title :  req.body.title,
		x : req.body.x,
		y : req.body.y,
		typeId : req.body.typeId,
		comments : req.body.comments,
		referEndNode : req.body.referEndNode || []
	}

	var VPageListModel = VSiteDBCtrl.getVPageListModel();

	var updateHandlerInfo = new dbHandlers.UpdateHandlerInfo(
		"update",
		conditions,
		{$set : _vpageObj},
		function(err, doc){
			if (!err)
			{
				_vpageObj.vsiteId = siteId;
				_vpageObj.vpageId = vpageId;
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

	db.update(VPageListModel, updateHandlerInfo);


};