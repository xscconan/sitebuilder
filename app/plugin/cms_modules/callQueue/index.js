var pluginInterface = require('../../../meta/PluginInterface.js');

var callQueue = exports.callQueue = pluginInterface.Plugin;

/*
*	voice page creator module
*   using svg for showing
*	Added by michael
*   require account, REST plugin enabled and mongoDB enabled
*/

callQueue.prototype.moduleConfSet = function(){
	this.enable = true;
	this.version = '1.0';
	this.name = "callQueue";
	this.displayName = 'hub and agent creator';

	this.router.enableJade = true;
};


callQueue.prototype.moduleInit = function(){

};