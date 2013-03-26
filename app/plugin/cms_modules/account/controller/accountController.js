var db = require('../storge/db/db.js');
var CONF = require('../config.json');
var crypto = require('crypto');

exports.AccountController  = {
	userAuthenticate : function(userInfo, callbackFun){
		var sql = 'SELECT uuid, salt, name, password FROM '+CONF.db.dbTable+' WHERE email=?';
		var param  = [userInfo.email];
		
		db.read(sql,param, function(result){
			var _userData = {};
			_userData.isLogin = false;

			if (!!result && result.length >0 && !!result[0].salt && !!result[0].password)
			{
				var _password = crypto.createHash('md5').update(userInfo.password + result[0].salt).digest('hex');
				if (_password === result[0].password);
				{
					_userData.isLogin = true;
					_userData.uuid = result[0].uuid;
					_userData.displayName = result[0].name;
					_userData.email = userInfo.email;
				}

			}
			
			callbackFun(_userData);
		});
	}
}