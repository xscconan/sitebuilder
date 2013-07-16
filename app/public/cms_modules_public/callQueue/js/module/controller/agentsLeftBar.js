define(['jquery', 'UTILS/panels','contentTmp/newCallHub', 'meta/CallHub', 'meta/ShareObj'],
 function($, Panel, NewCallHubTmp, CallHub, ShareObj){

	var AgentCategory = {
		addCallHub : function(){
			Panel.MaskLayour.insert();
			Panel.PopupPanel.insert(NewCallHubTmp.panelId, NewCallHubTmp.title, NewCallHubTmp.body, function(){
			    Panel.MaskLayour.remove();
			});
			Panel.PopupPanel.btnsEventListen(NewCallHubTmp.buttonsObj, NewCallHubTmp.panelId);
		},
		initAgentCategories : function(hubs){
			$("#callHubList").html('');
			if (hubs.length == 0)
				return;

			for (i in hubs)
			{
				var callHub = new CallHub(hubs[i]);
				callHub.insert("#callHubList");
				ShareObj.CallHubList[callHub.uuid] = callHub;
			}
		},
		doFilter : function(){
			$("#callHubList").html('');
			var val = $("#hubSearch").val();

			for (i in ShareObj.CallHubList)
			{
				var callHub = ShareObj.CallHubList[i];
				
				if (val.length == 0 || callHub.name.indexOf(val) != -1 )
				{
					callHub.insert("#callHubList");
				}
			}
		}
	};
	 

	var _init = function(data){
		AgentCategory.initAgentCategories(data.hubs);

		$("#addCallHub").click(function(){
			AgentCategory.addCallHub();
			$('#colorpicker').farbtastic("#hubColor");

		});

		hubSearchJo = $("#hubSearch");
		hubSearchJo.focus(function(){
				hubSearchJo.addClass("onFocus");
			}).blur(function(){
				if (hubSearchJo.val() == ""){
					hubSearchJo.removeClass("onFocus");
				}
			}).keyup(function(){
				AgentCategory.doFilter();
			}).bind('webkitspeechchange', function(){
				AgentCategory.doFilter();
			});
	}

	return {
		init : _init
	}
});