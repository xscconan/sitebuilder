define(['jquery', 'UTILS/panels','contentTmp/newAgentPanel', 'meta/Agent', 'util/panels', 'meta/ShareObj'], 
	function($, Panel, NewAgentPanel, Agent, CqPanels, ShareObj){
	var AgentCtrl = {
		popupAddAgent : function(){
			Panel.MaskLayour.insert();
			Panel.PopupPanel.insert(NewAgentPanel.panelId, NewAgentPanel.title, NewAgentPanel.body, function(){
			    Panel.MaskLayour.remove();
			});
			Panel.PopupPanel.btnsEventListen(NewAgentPanel.buttonsObj, NewAgentPanel.panelId);
		},
		initHubSelector : function(){
			var tmp = CqPanels.getHubSelectorHtml("hubSelector", true);
			if (tmp.length > 0)
			{
				var hubSelectorJo = $('#hubSelectorBox');
				hubSelectorJo.html(tmp);
				hubSelectorJo.parent().fadeIn();
			}
		},
		initAgents : function(agents){
			$("#agentList").html('');

			if (agents.length == 0)
				return;

			
			for (i in agents)
			{
				var agent = new Agent(agents[i]);
				agent.insert("#agentList");
				ShareObj.AgentList[agent.uuid] = agent;
			}
		}
	}

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