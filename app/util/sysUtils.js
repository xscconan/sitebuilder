var fs = require('fs');
var CONF = require('../config/config.json');
var path = require('path');

exports.getWSAppServ = function(app, isSSL)
{
	var https = require('https');
	var http = require('http');
	var options = false;

	if (isSSL && CONF.SSL.enableSSL)
	{
		options = {
				  	key: fs.readFileSync(CONF.SSL.sslKey),
				  	cert: fs.readFileSync(CONF.SSL.sslCert),
				  	requestCert: true,
				  	passphrase : CONF.SSL.passphrase,
				  	ca : fs.readFileSync(CONF.SSL.sslCA)
				};
		return https.createServer(options, app);
	}
	return http.createServer(app);
};

exports.loadRouters = function(ROUTER_ARRAY, httpApp, isModuleRouter, _moduleInfo)
{
	//init express router
	for (_routerPath in ROUTER_ARRAY)
	{
		var router = ROUTER_ARRAY[_routerPath];
	
		if (isModuleRouter && !!_moduleInfo)
			httpApp.plugins[router.name] = _moduleInfo;

		httpApp[router.method](_routerPath, function(req, res){
			var file = null;
			var _router = ROUTER_ARRAY[req.route.path];
			var _routerName = _router.name;
			var moduleInfo = httpApp.plugins[_routerName];

			if (!isModuleRouter)
				file = path.resolve(__dirname,'../controller/webPageController/')+ "/"+ _routerName +'Controller.js';
			else
				file = path.resolve(__dirname,'../plugin/cms_modules/')+ "/"+ moduleInfo.name + '/controller/'+ _routerName +'Controller.js';
			if (!!file && fs.existsSync(file))
			{
				var Handler = require(file);
				var httpHandle = new Handler.HttpHandler();

				req.isSeesionProtected = (!!_router.session);
				httpHandle.handleRequest(req, res, function(assigedViewData){
					var thisRoute = ROUTER_ARRAY[req.path];

					if (typeof thisRoute == 'undefined')
						res.redirect('/404');
					else if (!!thisRoute.resType && thisRoute.resType == "jade")
					{

						var jadeFile = thisRoute.name + '.jade';
						if (isModuleRouter)
							jadeFile = './cms_modules_views/' + moduleInfo.name + '/' + jadeFile;

						res.render(jadeFile, assigedViewData);
						
					}
					else
					{
						if (!!_router.resContentType)
							res.set('Content-Type', _router.resContentType);

						res.send(assigedViewData.body.content);
					}

				});
		
			}
		});
	}
};