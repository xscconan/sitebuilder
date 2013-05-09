var CONF =  require('../config/config.json');

exports.getLangs = function(){
	var file =  "./"+ CONF.defaultLang +'/lang.js';
	if (!!file && fs.existsSync(file))
	{
		return require(file);
	}
}