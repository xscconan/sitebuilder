var Handler = require('../../../../meta/HttpHandler.js');
var ShareUtils = require('../../../../public/sharedJs/libs/utils.js').Utils;
var _VSiteSchema = require('../../pageBoard/dbSchema/VSiteSchema.js').VSiteSchema;
var Handlers = require("../../../../storge/model/MongoHander.js");

var db = require("../../../../storge/db/db.js");
var mongoose = require('mongoose');

exports.HttpHandler = HttpHandler = function(){};
HttpHandler.prototype = new Handler.HttpHandler();

HttpHandler.prototype.onHandle = function(req, res, callbackFun){

	
};