var CQ = {};

CQ.CallHub = {
	accountId : String,
	hubId : String,
	color : String,
	name : String,
	agents : Array
};

CQ.Agent = {
	accountId : String,
	agentId : String,
	name : String,
	phone : String,
	email : String,
	password : String,
	skill : String,
	isSupervisor : Boolean,
	hubs : Array,
	updateKey : String
};

exports.CQ = CQ;