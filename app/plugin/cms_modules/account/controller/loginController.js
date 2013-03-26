var Handler = require('../../../../meta/HttpHandler.js');
var AccountCtrl = require('./accountController.js').AccountController;

exports.HttpHandler = HttpHandler = function(){};
HttpHandler.prototype = new Handler.HttpHandler();

var LoginCtrl = {
	commandHandle : {
		doLogin : function(req, res, callbackFun){
			var userInfo = {email : req.body.username, password : req.body.password};
			AccountCtrl.userAuthenticate(userInfo, function(userData){
				if(!!userData && !!userData.isLogin)
				{
					LoginCtrl.registerUserSession(req, userData);
					res.redirect('/');
				}
				else
					//todo lang
					callbackFun({content:"", error: "please check your email or password!"});
			});
		},
		doLogout : function(req, res, callbackFun){
			LoginCtrl.registerUserSession(req);
			res.redirect('/');
		},
		defaultHandle : function(req, res, callbackFun){
			callbackFun();
		}
	},
	registerUserSession : function(req, userData){
		req.session.user = userData;
	},
	removeUserSession : function(req){
		req.session.user = null;
	}
}


HttpHandler.prototype.title = 'Login page';

HttpHandler.prototype.onHandle = function(req, res, callbackFun){
	var _command = req.body.command || req.query.command;

	if (!!_command && !!LoginCtrl.commandHandle[_command])
		LoginCtrl.commandHandle[_command](req, res, callbackFun);
	else
		LoginCtrl.commandHandle.defaultHandle(req, res, callbackFun);
};