define(['jquery', 'UTILS/panels', 'controller/vpageAjaxController', 'SYLIB/mustache'], 
	function($, Panels, VPageAjaxCtrl, Mustache){

	var _getTmp =  function(_VPage){
		var vpageEditPanelTmp = {};

	vpageEditPanelTmp.buttonsObj = 
	{buttons : 
			[{
				id : 'doEditMore', text : "EDIT MORE", clickEventFun : function(){
				
					require(['controller/vpageController'],function(VPageCtrl){
						VPageCtrl.popupVPageEditMore(_VPage);
					})
					
				}, isDirectClose: true
			},
			{
				id : 'doUpdateVpage', text : "SAVE", clickEventFun : function(){
					var _baseEditJo =  $("#baseEdit_" + _VPage.uuid);
					_VPage.title = _baseEditJo.find(".title").val();
					_VPage.comments = _baseEditJo.find(".comments").val();

					VPageAjaxCtrl.updateVpages(_VPage, function(data){
						if (data === "0")
							alert("fail!")
						else{
							alert("done!");
							_VPage.resetUI();
						}
							
						Panels.PopupPanel.removePanelById( _VPage.uuid + "_popupPanel");
						
					});
				}, 
				validation : function(){
					var _baseEditJo =  $("#baseEdit_" + _VPage.uuid);
					var text = _baseEditJo.find(".title").val();
					if (!!text && text.length > 0)
					{
						return true;
					}
					else
					{
						alert('text must more than zero!');
						return false;
					}
				},isAjax: true
			}]
		};

		var content = '<div id="baseEdit_{{uuid}}"><table><tr><td>Title: </td><td><input class="title" value="{{title}}"/></td></tr><tr><td>Comment: </td><td><textarea class="comments">{{comments}}</textarea></td></tr></table></div>';
		vpageEditPanelTmp.content = Mustache.render(content, _VPage);
		vpageEditPanelTmp.content += Panels.PopupPanel.buttonsPanel(vpageEditPanelTmp.buttonsObj);
	
		return vpageEditPanelTmp;
	}
	

	return {
		getTmp : _getTmp
	}
});