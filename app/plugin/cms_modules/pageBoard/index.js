var pluginInterface = require('../../../meta/PluginInterface.js');
var sysMemory = require('./storge/Memory/sysMemory.js');

var pageBoard = exports.pageBoard = pluginInterface.Plugin;

/*
*	voice page creator module
*   using svg for showing
*	Added by michael
*   require account plugin enabled and mongoDB enabled
*/

pageBoard.prototype.moduleConfSet = function(){
	this.enable = true;
	this.version = '1.0';
	this.name = "pageBoard";
	this.displayName = 'vcc page creator';

	this.router.enableJade = true;
};


pageBoard.prototype.moduleInit = function(){
	sysMemory.initGlobalData();
};