var Handler = require('../../../../meta/HttpHandler.js');

exports.HttpHandler = HttpHandler = function(){};
HttpHandler.prototype = new Handler.HttpHandler();

HttpHandler.prototype.title = 'Call Queue Management';

HttpHandler.prototype.onHandle = function(req, res, callbackFun){
	callbackFun();
};