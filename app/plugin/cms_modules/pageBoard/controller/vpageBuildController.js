var Handler = require('../../../../meta/HttpHandler.js');

exports.HttpHandler = Handler.HttpHandler;

Handler.HttpHandler.prototype.onHandle = function(req, res){
	console.log('sdsd');

};