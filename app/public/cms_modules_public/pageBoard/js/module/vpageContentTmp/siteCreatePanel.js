define(['UTILS/panels', 'controller/vsiteAjaxController'], function(Panels, VSiteAjaxCtrl){
	var SiteCreatePanelTmp = {};
	SiteCreatePanelTmp.buttonsObj = {buttons : [
			{id : 'doCreateNewSite', text : "CREATE", clickEventFun : function(){
				var VSite = {'siteName' : $('#siteName').val()};
				VSiteAjaxCtrl.createNewSite(VSite, function(data){
					if (!data || data === "0")
					{
						alert('Create Voice site fail!')
					}
					else
						alert('Created!')
					
					$("#createNewSite").fadeOut(1000, function(){
						$(this).remove();
						Panels.MaskLayour.remove();
					})

				});
			}, isAjax: true}
		]
	};
	SiteCreatePanelTmp.title = 'New Voice Site';
	SiteCreatePanelTmp.body = '<div id="createSiteBody"><table><tr><td>Site Name</td><td><input type="text" placeholder="New Site" maxlength="50" id="siteName"></td></tr></table></div>';
	SiteCreatePanelTmp.body += Panels.PopupPanel.buttonsPanel(SiteCreatePanelTmp.buttonsObj);

	return SiteCreatePanelTmp;
});