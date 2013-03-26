var Handler = require('../../meta/HttpHandler.js');

exports.HttpHandler = HttpHandler = function(){};
HttpHandler.prototype = new Handler.HttpHandler();

HttpHandler.prototype.title = 'index';

HttpHandler.prototype.onHandle = function(req, res, callbackFun){
	callbackFun();
};