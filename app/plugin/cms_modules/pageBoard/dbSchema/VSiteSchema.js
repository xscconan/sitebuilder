var SiteBuild = {};

SiteBuild.VSiteSchema = {
	accountId : String,
	vsites : [{
		vsiteId : String,
		vsiteName : String
	}]	
};

SiteBuild.VGroupListSchema = {
	vsiteId : String,
	vgroupId : String,
	title : String,
	x : Number,
	y : Number,
	vpagesBtns : Array
};

SiteBuild.VPageListSchema = {
	vsiteId : String,
	vpageId : String,
	vgroupId : String,
	title : String,
	x : Number,
	y : Number,
	typeId : String,
	comments : String,
	referEndNode : Array
};

SiteBuild.VPageSchema = {

};


exports.SiteBuild = SiteBuild;