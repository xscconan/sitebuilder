var SiteBuild = {};

SiteBuild.VSiteSchema = {
	accountId : String,
	vsites : [{
		vsiteId : String,
		vsiteName : String
	}]
	
};

SiteBuild.VPageListSchema = {
	vsiteId : String,
	vpageId : String,
	title : String,
	x : Number,
	y : Number,
	typeId : String,
	comments : String,
	referEndNode : Array
};


exports.SiteBuild = SiteBuild;