var Handler = require('../../../../meta/HttpHandler.js');

exports.HttpHandler = HttpHandler = function(){};
HttpHandler.prototype = new Handler.HttpHandler();

HttpHandler.prototype.title = 'create vpage';

HttpHandler.prototype.onHandle = function(req, res, callbackFun){
	if (!req.query ||  !req.query.siteId)
	{
		res.redirect('/vsiteList');
		return;
	}

	callbackFun();
};