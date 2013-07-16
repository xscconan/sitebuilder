define(['jquery', 'controller/agentController'], 
	function($,  AgentCtrl){

	var _init = function(data, callbackFun){
		AgentCtrl.initAgents(data.agents)

		$("#popupAddAgent").click(function(){
			AgentCtrl.popupAddAgent();
			AgentCtrl.initHubSelector();
		});

		$("#navigation li").click(function(){
			var thisJo = $(this);
			if (!thisJo.hasClass("selected"))
			{
				$("#navigation > .selected").removeClass("selected");
				$(this).addClass("selected");	
			}
			
		});


		agentSearchJo = $("#agentSearch");
		agentSearchJo.focus(function(){
				agentSearchJo.addClass("onFocus");
			}).blur(function(){
				if (agentSearchJo.val() == ""){
					agentSearchJo.removeClass("onFocus");
				}
			}).keyup(function(){
				_AgentList.AgentFilter.doFilter();
			}).bind('webkitspeechchange', function(){
				_AgentList.AgentFilter.doFilter();
			});

		callbackFun();
	}

	return {
		init : _init
	}
});