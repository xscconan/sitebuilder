var pluginInterface = require('../../../meta/PluginInterface.js');

var account = exports.account = pluginInterface.Plugin;

/*
*	For account module
*	Added by michael
*/


account.prototype.moduleConfSet = function(){
	this.enable = false;
	this.version = '1.0';
	this.name = "account";
	this.displayName = 'account system';
};

account.prototype.moduleInit = function(){
	console.log(this.enable);
	console.log(123);
};