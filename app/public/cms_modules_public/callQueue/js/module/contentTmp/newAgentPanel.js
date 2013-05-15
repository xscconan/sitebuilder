define(['UTILS/panels', 'controller/cqAjaxController', 'util/panels'], function(Panels, CQAjaxCtrl, CqPanels){
	var Tmp = {};
	Tmp.panelId = "agentPanel";
	Tmp.buttonsObj = {buttons : [
			{id : 'addOrUpdateAgent', text : "CREATE", clickEventFun : function(){
				var _hubsJo = $("#hubSelector li.selected");
				var len = _hubsJo.length;
				var _hubs = [];
				for (i = 0; i<len; i++)
				    _hubs.push($(_hubsJo[i]).attr('value'));

				var AgentObj = {
					'name' : $('#agentName').val(),
					'phone' : $('#agentPhone').val(),
					'skill' : $('#agentSkill').val(),
					'hubs' : _hubs,
					'isSupervisor' : jQuery("#isSupervisor").is(":checked"),
					'isSendMail' : jQuery("#isSendMail").is(":checked"),
					'agentId' : $('#agentIdMark').val(),
					'updateKey' : $('#agentIdMark').attr('updateKey')
				};

				if ($('#agentEmail').length > 0)
					AgentObj.email = $('#agentEmail').val();

				var passwordOpJo = $('#passwordOp');
				if (
						passwordOpJo.is(":hidden") || 
						!passwordOpJo.is(":hidden") && $("#resetAgPwd").is(":checked")
					)
					AgentObj.password = $('#agentPassword').val();

				CQAjaxCtrl.writeNewAgent(AgentObj, function(data){
					if (!data || data === "0")
						alert('Fail!')
					else {
						require(['controller/agentController'],function(AgentCtrl){
							AgentCtrl.addOrOrUpdateAgent(data);
						});
					}
						
					
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

	tmpBody.push('<div id="createAgentBody"><input id="agentIdMark" value="" updateKey="" hidden/><table>');
	tmpBody.push('<tr><td>Agent Email</td><td><input type="text" value="" maxlength="32" id="agentEmail"/><span id="emailOp"></span></td></tr>');
	tmpBody.push('<tr><td>Agent Password</td><td><input type="text" value="" maxlength="32" id="agentPassword"><span id="passwordOp" hidden><input id="resetAgPwd" type="checkbox" / > Reset</span></td></tr>');
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