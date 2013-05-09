define(['jquery', 'SYLIB/mustache', 'UTILS/panels', 'contentTmp/newAgentPanel'],
 function($, Mustache, Panel, NewAgentPanel){
	var Agent = function(Agent){
		this.uuid = Agent.agentId;
		this.name = Agent.name;
		this.phone = Agent.phone;
		this.email =  Agent.email;
		this.skill =  Agent.skill;
		this.isSupervisor =  Agent.isSupervisor;

		this.Jo = null;
	}

	Agent.prototype.getHtml = function(){
		var tmp = '<li class="agentItem banner green" id="{{uuid}}"><dt id="title">{{name}} <font>({{skill}})</font></dt><dt id="email">{{email}}</dt><dt id="phone">{{phone}}</dt></li>';

		 return Mustache.render(tmp, this);
	}

	Agent.prototype.insert = function(parentBoxId){
		$(parentBoxId).append(this.getHtml());
		this.Jo = jQuery("#" + this.uuid);
		this.eventListen();
	}

	Agent.prototype.popupUpdatePanel = function(){
		Panel.MaskLayour.insert();
		Panel.PopupPanel.insert(NewAgentPanel.panelId, NewAgentPanel.title, NewAgentPanel.body, function(){
		    Panel.MaskLayour.remove();
		});
		Panel.PopupPanel.btnsEventListen(NewAgentPanel.buttonsObj, NewAgentPanel.panelId);

		//ui set
		var PanelJo = $("#" + NewAgentPanel.panelId);
		PanelJo.find('.titleName').text("Update Agent");
		$('#agentName').val(this.name);
		$('#agentPhone').val(this.phone);
		$('#agentEmail').val(this.email);
		$('#agentSkill').val(this.skill);
		if (!!this.isSupervisor)
			jQuery("#isSupervisor").attr("checked","checked");

		$("#addOrUpdateAgent").text("UPDATE");
	}

	Agent.prototype.eventListen = function(){
		var This = this;
		this.Jo.click(function(){
			This.popupUpdatePanel();
		});
	}

	return Agent;
});