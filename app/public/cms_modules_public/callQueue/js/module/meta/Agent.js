define(['jquery', 'SYLIB/mustache', 'UTILS/panels', 'contentTmp/newAgentPanel'],
 function($, Mustache, Panel, NewAgentPanel){
	var Agent = function(Agent){
		this.uuid = Agent.agentId;
		this.name = Agent.name;
		this.phone = Agent.phone;
		this.email =  Agent.email;
		this.skill =  Agent.skill;
		this.isSupervisor =  Agent.isSupervisor;
		this.hubs = Agent.hubs;
		this.updateKey = Agent.updateKey;
		this.Jo = null;
	}

	Agent.prototype.getHtml = function(){
		var tmp = '<li class="agentItem banner green" id="{{uuid}}"><dt class="title">{{name}} <font>({{skill}})</font></dt><dt class="email">{{email}}</dt><dt class="phone">{{phone}}</dt></li>';

		 return Mustache.render(tmp, this);
	}

	Agent.prototype.insert = function(parentBoxId){
		$(parentBoxId).append(this.getHtml());
		this.Jo = jQuery("#" + this.uuid);
		this.eventListen();
	}

	Agent.prototype.update = function(agentObj){
		this.name = agentObj.name;
		this.phone = agentObj.phone;
		this.email =  agentObj.email;
		this.skill =  agentObj.skill;
		this.isSupervisor =  agentObj.isSupervisor;
		this.hubs = agentObj.hubs;

		var titleStr = this.name;
		if (!!this.skill)
			titleStr + " <font>("+this.skill+")</font>";
		this.Jo.find(".title").html(titleStr);
		this.Jo.find(".email").html(this.email);
		this.Jo.find(".phone").html(this.phone);
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
		$('#agentEmail').val(this.email).hide().after(this.email);
		$('#agentSkill').val(this.skill);
		$('#agentPassword').val('***********').attr('disabled', 'disabled');
		$('#passwordOp').fadeIn();

		$("#agentIdMark").attr({'updateKey':this.updateKey, 'value':this.uuid});

		$('#resetAgPwd').click(function(){
			if ($(this).is(":checked"))
			{
				$('#agentPassword').val('').removeAttr('disabled');
			}
			else
				$('#agentPassword').val('***********').attr('disabled', 'disabled');
		});

		if (!!this.isSupervisor)
			jQuery("#isSupervisor").attr("checked","checked");

		$("#addOrUpdateAgent").text("UPDATE");
		var This = this;
		require(['controller/agentController'],  function(AgentCtrl){
			AgentCtrl.initHubSelector(This.hubs);
		});
			
	}

	Agent.prototype.eventListen = function(){
		var This = this;
		this.Jo.click(function(){
			This.popupUpdatePanel();
		});
	}

	return Agent;
});