var Handler = require('../../../../meta/HttpHandler.js');
var ShareUtils = require('../../../../public/sharedJs/libs/utils.js').Utils;
var VSiteDBCtrl = require('../../pageBoard/controller/vsiteDbController.js');
var dbHandlers = require("../../../../storge/model/MongoHandler.js");

var db = require("../../../../storge/db/db.js");

exports.HttpHandler = HttpHandler = function(){};
HttpHandler.prototype = new Handler.HttpHandler();

HttpHandler.prototype.onHandle = function(req, res, callbackFun){
	var accountId =  req.session.user.uuid;
	var vsiteId = ShareUtils.UUID();
	var vsiteName = req.body.siteName || "New Site";

	var VSiteModel = VSiteDBCtrl.getVSiteModel();

	var _returnResult = function(err, docs, VSiteObj){
		if (!err)
			callbackFun(VSiteObj);
		else
			callbackFun('0');
	}


	var findHandlerInfo = new dbHandlers.FindHandlerInfo(
		"find",
		{"accountId" : accountId},
		null,
		function(err, doc){
			if (!!err){
				_returnResult(err);
				return;
			}
				

			var VSiteObj = {};
			VSiteObj.accountId = accountId;
			VSiteObj['vsites'] = [];

			var _vsite = {};
			_vsite.vsiteId = vsiteId;
			_vsite.vsiteName = vsiteName;

			VSiteObj['vsites'].push(_vsite);

			if ( doc.length > 0)
			{
				var updateHandlerInfo = new dbHandlers.UpdateHandlerInfo(
				"update",
				{"accountId" : accountId },
				{$push : {vsites : _vsite} },
				function(err, docs){
					VSiteObj.method = 'update';
					_returnResult(err, docs, VSiteObj);
				});

				db.update(VSiteModel, updateHandlerInfo);
			}
			else
			{
				var VSiteEntity = new VSiteModel(VSiteObj);
				db.write(VSiteEntity, function(err, docs){
					VSiteObj.method = 'save';
					_returnResult(err, docs, VSiteObj);
				});

			}
		}
	);

	db.read(VSiteModel, findHandlerInfo);
	
};