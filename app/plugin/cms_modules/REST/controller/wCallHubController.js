var Handler = require('../../../../meta/HttpHandler.js');
var ShareUtils = require('../../../../public/sharedJs/libs/utils.js').Utils;
var CQDBCtrl = require('../../callQueue/controller/cqDbController.js');
var db = require("../../../../storge/db/db.js");

var dbHandlers = require("../../../../storge/model/MongoHandler.js");


exports.HttpHandler = HttpHandler = function(){};
HttpHandler.prototype = new Handler.HttpHandler();

HttpHandler.prototype.onHandle = function(req, res, callbackFun){
	var _accountId =  req.session.user.uuid;
	var _callHubId = ShareUtils.UUID();

	var _callHubObj = {
		accountId : _accountId,
		hubId : _callHubId,
		name :  req.body.name,
		color: req.body.color
	}

	var CallHubModel = CQDBCtrl.getCallHubModel();

	var updateHandlerInfo = new dbHandlers.UpdateHandlerInfo(
		"update",
		{ "hubId": _callHubId },
		_callHubObj,
		function(err, doc){
			if (!err && doc == 1)
			{
				_callHubObj.created = "1";
				callbackFun(_callHubObj);
			}
			else
			{
				console.log(err);
				callbackFun("0");
			}
		},
		{upsert : true }
	);

	db.update(CallHubModel, updateHandlerInfo);
};