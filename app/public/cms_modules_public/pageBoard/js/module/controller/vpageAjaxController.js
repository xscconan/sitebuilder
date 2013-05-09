define(['jquery', 'UTILS/utils'], function($, SYUtils){
	var VPageAjaxCtrl = {
		'url' : '',

		getAllPages : function(callbackFun){
			var _siteId =  SYUtils.getUrlParam("siteId");
			$.post('/getVPages', {siteId : _siteId},  function(data){
				callbackFun(data);
			});
		},
		saveVPage : function(VPage, callbackFun){
			var _siteId =  SYUtils.getUrlParam("siteId");

			var _vpage = {
				siteId : _siteId,
				title : VPage.title,
				x : VPage.x,
				y : VPage.y,
				typeId : VPage.typeId,
				vgroupId : VPage.vgroupId
			};

			$.post('/newVPage', _vpage, function(data){
				console.log(data);
				callbackFun(data);
			});
		},
		updateVpages : function(VPage, callbackFun){
			if (!VPage)
				return;

			var _siteId =  SYUtils.getUrlParam("siteId");

			var _vpage = {
				siteId : _siteId,
				vpageId : VPage.uuid,
				vgroupId : VPage.vgroupId,
				title : VPage.title,
				x : VPage.x,
				y : VPage.y,
				typeId : VPage.typeId,
				comments : VPage.comments,
				referEndNode : VPage.referEndNode
			};

			$.post('/updateVPage', _vpage, function(data){
				if (!!callbackFun)
					callbackFun(data);
			});
		},
		deleteVpages : function(){

		}


	};

	return VPageAjaxCtrl;
});