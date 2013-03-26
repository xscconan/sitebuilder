var pluginInterface = require('../../../meta/PluginInterface.js');
var db = require('./storge/db/db.js');


var account = exports.account = pluginInterface.Plugin;

/*
*	For account module
*	Added by michael
*/


account.prototype.moduleConfSet = function(){
	this.enable = true;
	this.version = '1.0';
	this.name = "account";
	this.displayName = 'account system';

	this.router.enable = true;
};

account.prototype.moduleInit = function(){
	db.init();
};