var Handler = require('../../meta/HttpHandler.js');

exports.HttpHandler = HttpHandler = function(){};
HttpHandler.prototype = new Handler.HttpHandler();

HttpHandler.prototype.title = '404 page';

HttpHandler.prototype.onHandle = function(req, res, callbackFun){
	callbackFun("404");
};

