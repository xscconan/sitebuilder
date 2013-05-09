define(['UTILS/panels', 'controller/cqAjaxController', 'util/panels'], function(Panels, CQAjaxCtrl, CqPanels){
	var Tmp = {};
	Tmp.panelId = "agentPanel";
	Tmp.buttonsObj = {buttons : [
			{id : 'addOrUpdateAgent', text : "CREATE", clickEventFun : function(){
				var _hubs = $("#hubSelector").val();
				_hubs = !!_hubs?_hubs:[];

				var AgentObj = {
					'name' : $('#agentName').val(),
					'phone' : $('#agentPhone').val(),
					'email' : $('#agentEmail').val(),
					'password' : $('#agentPassword').val(),
					'skill' : $('#agentSkill').val(),
					'hubs' : _hubs,
					'isSupervisor' : jQuery("#isSupervisor").is(":checked"),
					'isSendMail' : jQuery("#isSendMail").is(":checked")
				};

				CQAjaxCtrl.writeNewAgent(AgentObj, function(data){
					if (!data || data === "0")
					{
						alert('Create agent group fail!')
					}
					else 
						alert('Created!')
					
					$("#" + Tmp.panelId).fadeOut(1000, function(){
						$(this).remove();
						Panels.MaskLayour.remove();
					})

				});
			}, isAjax: true}
		]
	};

	Tmp.title = 'New Agent';
	var tmpBody = []

	tmpBody.push('<div id="createAgentBody"><table>');
	tmpBody.push('<tr><td>Agent Email</td><td><input type="text" value="" maxlength="32" id="agentEmail"/><span id="emailOp"></span></td></tr>');
	tmpBody.push('<tr><td>Agent Password</td><td><input type="text" value="" maxlength="32" id="agentPassword"><span id="passwordOp"></span></td></tr>');
	tmpBody.push('<tr><td>Agent Name</td><td><input type="text"  maxlength="20" id="agentName"></td></tr>');
	tmpBody.push('<tr><td>Agent Phone</td><td><input type="text" value="" maxlength="32" id="agentPhone"></td></tr>');
	tmpBody.push('<tr><td>Agent Skill</td><td><input type="text" value="" maxlength="32" id="agentSkill"></td></tr>');
	tmpBody.push('<tr hidden><td>Join Hub</td><td id="hubSelectorBox"></td></tr>');
	tmpBody.push('<tr><td><input id="isSupervisor" type="checkbox"/> Supervisor</td><td></td></tr>');
	tmpBody.push('<tr><td colspan="2"> <input id="isSendMail" type="checkbox"> Send account information to Agent by email</td></tr>');
	tmpBody.push('</table>');

	tmpBody.push(Panels.PopupPanel.buttonsPanel(Tmp.buttonsObj));

	Tmp.body = tmpBody.join('');

	return Tmp;
});