var mongoose = require('mongoose');

exports.FindHandlerInfo = function(updateMethod, conditions, fields, callbackFun){
	this.updateMethod = updateMethod || "find";
	this.conditions = conditions || {};
	this.fields  = fields || null;
	this.options = null;
	this.callbackFun =  callbackFun || function(err, doc){};
};

exports.UpdateHandlerInfo = function(updateMethod, conditions, updates, callbackFun, options){
	this.updateMethod = updateMethod || "findOneAndUpdate";
	this.conditions = conditions || {};
	this.updates = updates || {};
	this.options = options || null;
	this.callbackFun =  callbackFun || function(err){};
};


exports.DelHandlerInfo = function(conditions, callbackFun){
	this.conditions = conditions || {};
	this.callbackFun =  callbackFun || function(err){};
};


exports.getModel = function(modelName, schemaObj){
	var Model = null;
	try {
	    Model = global.db.model(modelName);
	} catch (e) {

		var Schema = new mongoose.Schema(schemaObj);

    	Model = global.db.model(modelName, Schema);
	}

	return Model;
};