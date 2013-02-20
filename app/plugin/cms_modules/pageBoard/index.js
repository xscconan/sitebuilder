var pluginInterface = require('../../../meta/PluginInterface.js');

var pageBoard = exports.pageBoard = pluginInterface.Plugin;

/*
*	voice page creator module
*   using svg for showing
*	Added by michael
*/

pageBoard.prototype.moduleConfSet = function(){
	this.enable = true;
	this.version = '1.0';
	this.name = "pageBoard";
	this.displayName = 'vcc page creator';

	this.view.enable = true;
};


pageBoard.prototype.moduleInit = function(){
	// console.log(345);
};