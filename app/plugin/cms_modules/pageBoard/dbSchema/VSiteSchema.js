var VSiteSchema = {
	accountId : String,
	vsites : [{
		vsiteId : String,
		vsiteName : String,
		vpages :[{
			vpageId : String,
			title : String,
			x : Number,
			y : Number,
			typeId : String,
			referEndNode : Array
		}]
	}]
	
};


exports.VSiteSchema = VSiteSchema;