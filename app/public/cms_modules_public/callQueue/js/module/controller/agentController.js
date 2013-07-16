define(['jquery', 'UTILS/panels', 'contentTmp/newAgentPanel', 'meta/Agent', 'util/panels', 'meta/ShareObj'], 
	function($, Panel, NewAgentPanel, Agent, CqPanels, ShareObj){

	var AgentCtrl = {
		popupAddAgent : function(){
			Panel.MaskLayour.insert();
			Panel.PopupPanel.insert(NewAgentPanel.panelId, NewAgentPanel.title, NewAgentPanel.body, function(){
			    Panel.MaskLayour.remove();
			});
			Panel.PopupPanel.btnsEventListen(NewAgentPanel.buttonsObj, NewAgentPanel.panelId);
		},
		initHubSelector : function(selectedHubs){
			var tmp = CqPanels.getHubSelectorHtml("hubSelector", selectedHubs);
			if (tmp.length > 0)
			{
				var hubSelectorJo = $('#hubSelectorBox');
				hubSelectorJo.html(tmp);
				hubSelectorJo.parent().fadeIn();

				$("#hubSelector li").click(function(){
					$(this).toggleClass("selected");
				});
			}
		},
		initAgents : function(agentObjs){
			$("#agentList").html('');

			if (agentObjs.length == 0)
				return;

			
			for (i in agentObjs)
			{
				var agent = new Agent(agentObjs[i]);
				agent.insert("#agentList");
				ShareObj.AgentList[agent.uuid] = agent;
			}
		},
		addOrOrUpdateAgent : function(agentObj)
		{
			var agent = ShareObj.AgentList[agentObj.agentId];
			
			if (!!agent)
				agent.update(agentObj);
			else{
				agent = new Agent(agentObj);
				agent.insert("#agentList");
			}
				
		}
	}

	return AgentCtrl;

});