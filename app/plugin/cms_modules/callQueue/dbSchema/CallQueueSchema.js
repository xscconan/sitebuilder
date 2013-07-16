var CQ = {};

CQ.AgentsInHub = {
	hubId : String,
	agentId : String
};

CQ.CallHub = {
	accountId : String,
	hubId : String,
	color : String,
	name : String
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