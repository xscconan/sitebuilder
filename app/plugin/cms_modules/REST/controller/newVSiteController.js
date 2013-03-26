var Handler = require('../../../../meta/HttpHandler.js');
var ShareUtils = require('../../../../public/sharedJs/libs/utils.js').Utils;
var _VSiteSchema = require('../../pageBoard/dbSchema/VSiteSchema.js').VSiteSchema;
var Handlers = require("../../../../storge/model/MongoHander.js");

var db = require("../../../../storge/db/db.js");
var mongoose = require('mongoose');

exports.HttpHandler = HttpHandler = function(){};
HttpHandler.prototype = new Handler.HttpHandler();

HttpHandler.prototype.onHandle = function(req, res, callbackFun){
	var accountId =  req.session.user.uuid;
	var vsiteId = ShareUtils.UUID();
	var vsiteName = req.body.siteName || "New Site";
	var VPageModel;

	try {
	    // Throws an error if "VPage" hasn't been registered
	    VPageModel = global.db.model('VSite');
	} catch (e) {
		var VSiteSchema = new mongoose.Schema(_VSiteSchema);

	    VSiteModel = global.db.model('VSite',VSiteSchema);
	}

	var _returnResult = function(err, docs, VSiteObj){
		if (!err)
			callbackFun(VSiteObj);
		else
			callbackFun('0');
	}


	var findHandlerInfo = new Handlers.FindHandlerInfo(
		"find",
		{"accountId" : accountId},
		null,
		function(err, doc){
			if (!!err || !doc)
				return;

			var VSiteObj = {};
			VSiteObj.accountId = accountId;
			VSiteObj['vsites'] = [];

			var _vsite = {};
			_vsite.vsiteId = vsiteId;
			_vsite.vsiteName = vsiteName;
			_vsite.vpages = [];

			VSiteObj['vsites'].push(_vsite);

			if ( doc.length > 0)
			{
				var updateHandlerInfo = new Handlers.UpdateHandlerInfo(
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