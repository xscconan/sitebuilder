define(['UTILS/panels', 'controller/vsiteAjaxController'], 
	function(Panels, VSiteAjaxCtrl){

	var MenuTmp = {};
	MenuTmp.buttonsObj = {buttons : [
			{id : 'doUpdateVpageMore', text : "SAVE", clickEventFun : function(){
				// var VSite = {'siteName' : $('#siteName').val()};
				// VSiteAjaxCtrl.createNewSite(VSite, function(data){
				// 	if (!data || data === "0")
				// 	{
				// 		alert('Create Voice site fail!')
				// 	}
				// 	else
				// 		alert('Created!')
					
				// 	$("#createNewSite").fadeOut(1000, function(){
				// 		$(this).remove();
				// 		Panels.MaskLayour.remove();
				// 	})

				// })
			}, isAjax: true}
		]
	};

	MenuTmp.content = '<div><table><tr><td>Title: </td><td><input /></td></tr><tr><td>Comment: </td><td><textarea></textarea></td></tr><tr><td>others: </td><td><input /></td></tr></table></div>';
	MenuTmp.content += Panels.PopupPanel.buttonsPanel(MenuTmp.buttonsObj);



	return MenuTmp;
});