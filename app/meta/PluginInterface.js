var sysUtils = require('../util/sysUtils.js');

var Plugin = exports.Plugin = function(){
	this.enable =  false;
	this.version = '';
	this.name = '';
	this.displayName = '';
	this.router = {
		'enable' : true,
		'enableJade' : false,
		'routerJson' : 'router.json'
	}
};

Plugin.prototype.loadModule = function(httpApp){
	this.moduleConfSet();

	if (this.enable) {
		if (this.router.enable)
		{
			var ROUTER_ARRAY = require('../plugin/cms_modules/' + this.name + '/router.json');
			sysUtils.loadRouters(ROUTER_ARRAY, httpApp, true, this);
		}
		this.moduleInit();
	};
	
};

Plugin.prototype.moduleConfSet = function(){};

Plugin.prototype.moduleInit = function(){};

