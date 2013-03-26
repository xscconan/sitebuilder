var db = require("../../../storge/db/db.js");
var Handlers = require("../../../storge/model/MongoHander.js");
var mongoose = require('mongoose');
var ShareUtils = require('../../../public/sharedJs/libs/utils.js').Utils;
var _VSiteSchema = require('../../../plugin/cms_modules/pageBoard/dbSchema/VSiteSchema.js').VSiteSchema;

var accountId =  'testaccount123123';

var VSiteObj = {};
VSiteObj = {};
VSiteObj.accountId = accountId;
VSiteObj['vsites'] = [];

var _vsite = {};
_vsite.vsiteId = "6728346782346";
_vsite.vsiteName = "New Site";
_vsite.vpages = [];

VSiteObj['vsites'].push(_vsite);



console.log(VSiteObj);

db.init();

var VPageModel;

try {
    // Throws an error if "VPage" hasn't been registered
    VPageModel = global.db.model('VSite');
} catch (e) {
	var VSiteSchema = new mongoose.Schema(_VSiteSchema);

    VSiteModel = global.db.model('VSite',VSiteSchema);
}


var findHandlerInfo = new Handlers.FindHandlerInfo(
	"find",
	{"accountId" : accountId},
	null,
	function(err, doc){
		console.log('find~~~~~~~~');
		console.log(err);
		console.log(doc);
	}
);


var updateHandlerInfo = new Handlers.UpdateHandlerInfo(
	"update",
	{"accountId" : accountId, "vsites.vsiteId": _vsite.vsiteId },
	{$set : {vsites : _vsite} },
	function(err){
		console.log('update~~~~~~~~');
		if (!err)
			console.log(VSiteObj);
		else
			console.log("0");


	}
);




//////////////save ///////////////
var VSiteEntity = new VSiteModel(VSiteObj);
db.write(VSiteEntity, function(err, docs){
	console.log('save~~~~~~~~');
	console.log(err);
	console.log(docs);

});



////////////////////////// update//////////////

VSiteObj['vsites'].vsiteName = "New Site 123123";
db.update(VSiteModel, updateHandlerInfo);


db.read(VSiteModel, findHandlerInfo);

