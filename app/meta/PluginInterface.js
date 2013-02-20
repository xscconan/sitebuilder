var sysUtils = require('../util/sysUtils.js');

var Plugin = exports.Plugin = function(){
	this.enable =  false;
	this.version = '';
	this.name = '';
	this.displayName = '';
	this.view = {
		'enable' : false,
		'routerJson' : 'router.json',
		'routerMethod' : 'get'
	}
};

Plugin.prototype.loadModule = function(httpApp){
	this.moduleConfSet();

	if (this.enable) {
		if (this.view.enable)
		{
			var ROUTER_ARRAY = require('../plugin/cms_modules/' + this.name + '/router.json');
			sysUtils.loadRouters(ROUTER_ARRAY, httpApp, true, this.name);
		}
		this.moduleInit();
	};
	
};

Plugin.prototype.moduleConfSet = function(){};

Plugin.prototype.moduleInit = function(){};

