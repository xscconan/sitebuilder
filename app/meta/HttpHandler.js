var lang = require("../lang/cn/lang.json");
var CONF =  require('../config/config.json');

var HttpHandler = exports.HttpHandler = function(){
	this.assigedViewData = {};
};

HttpHandler.prototype.sessionVerify = function(req){
	return (!!req.session && !!req.session.user && !!req.session.user.isLogin);
};

HttpHandler.prototype.onhandleRequest = function(req, res, callbackFun){
	this.assigedViewData.lang = lang;
	this.assigedViewData.user = req.session.user || false;
	this.assigedViewData.body = {};
	var This = this;

	this.onHandle(req, res, function(body){
		body = !!body?body:"";

		if ( typeof body === "object" && !! body.content)
		{
			This.assigedViewData.body.content = body.content;
			This.assigedViewData.body.error =  body.error;
		}
		else
			This.assigedViewData.body.content = body;

		callbackFun(This.assigedViewData);
	});
};

HttpHandler.prototype.handleRequest = function(req, res, callbackFun){

	// needed session protect and invalid session
	if (CONF.enableSession && !!req.isSeesionProtected && !this.sessionVerify(req))
		res.redirect('/');
	else
		this.onhandleRequest(req, res, callbackFun);
	
	
};

HttpHandler.onHandle = function(req, res, callbackFun){ 
	callbackFun() 
};