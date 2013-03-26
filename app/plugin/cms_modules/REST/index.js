var pluginInterface = require('../../../meta/PluginInterface.js');

var REST = exports.REST = pluginInterface.Plugin;

/*
*	REST module
*   input and output by ajax
*	Added by michael
*/

REST.prototype.moduleConfSet = function(){
	this.enable = true;
	this.version = '1.0';
	this.name = "REST";

	this.router.enableJade = false;
};


REST.prototype.moduleInit = function(){
	// init

};