exports.modulesLoader = function(httpApp){
	var modules = {};
	var pluginPath = __dirname + "/../plugin/cms_modules";
	require("fs").readdirSync(pluginPath).forEach(function(moduleName) {
		if (moduleName.indexOf('\.') == -1)
		{
			var tmpModules = require(pluginPath + '/' + moduleName);

			if (typeof tmpModules != 'undefined')
			{
				var _tmpModule = new tmpModules[moduleName];
				_tmpModule.loadModule(httpApp);
			}
			
		}
	});
};