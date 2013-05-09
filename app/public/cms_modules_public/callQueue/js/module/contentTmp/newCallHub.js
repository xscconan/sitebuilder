define(['UTILS/panels', 'controller/cqAjaxController', 'meta/CallHub', 'meta/ShareObj'], function(Panels, CQAjaxCtrl, CallHub, ShareObj){
	var Tmp = {};
	Tmp.panelId = "addCallHub";
	Tmp.buttonsObj = {buttons : [
			{id : 'doCreateNewCallHub', text : "CREATE", clickEventFun : function(){
				var callHubObj = {
					'name' : $('#callHubName').val(),
					'color' : $('#hubColor').val()
				};

				CQAjaxCtrl.writeNewCallHub(callHubObj, function(data){
					if (!data || data === "0")
					{
						alert('Create Call Hub fail!')
					}
					else 
					{
						var callHub = new CallHub(data);
						callHub.insert("#callHubList");
						ShareObj.CallHubList[callHub.uuid] = callHub;
					}
					
					$("#" + Tmp.panelId).fadeOut(1000, function(){
						$(this).remove();
						Panels.MaskLayour.remove();
					})

				});
			}, isAjax: true}
		]
	};
	
	Tmp.title = 'New Call Hub';

	var body = [];
	body.push('<div id="createSiteBody"><table>');
	body.push('<tr><td>Call Hub Name</td><td><input type="text" placeholder="New Call Hub" maxlength="50" id="callHubName"></td></tr>');
	body.push('<tr><td>Hub color</td><td><input type="text" value="#123456" maxlength="50" id="hubColor"></td></tr>');
	body.push('</table><div id="colorpicker"></div></div>');
	body.push(Panels.PopupPanel.buttonsPanel(Tmp.buttonsObj));
	Tmp.body = body.join("");

	return Tmp;
});