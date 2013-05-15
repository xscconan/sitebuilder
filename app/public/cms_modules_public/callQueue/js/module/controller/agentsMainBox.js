define(['jquery', 'controller/agentController'], 
	function($,  AgentCtrl){

	var _init = function(data, callbackFun){
		AgentCtrl.initAgents(data.agents)

		$("#popupAddAgent").click(function(){
			AgentCtrl.popupAddAgent();
			AgentCtrl.initHubSelector();
		});

		callbackFun();
	}

	return {
		init : _init
	}
});