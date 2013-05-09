define(['jquery', 'UTILS/utils'], function($, SYUtils){
	var VSiteAjaxCtrl = {
		createNewSite : function(VSite, callbackFun){
			VSiteObj = {
				siteName : VSite.siteName
			};

			$.post('/newVSite', VSiteObj, function(data){
				callbackFun(data);
			});
		},
		delVSite : function(_siteId, callbackFun){
			$.post('/delVSite', {siteId : _siteId}, function(data){
				alert(data);
				callbackFun(data);
			});
		},
		saveVGroup : function(VGroup, callbackFun){
			var _siteId =  SYUtils.getUrlParam("siteId");

			var _vgroup = {
				siteId : _siteId,
				title : VGroup.title,
				x : VGroup.x,
				y : VGroup.y
			};

			$.post('/newVGroup', _vgroup, function(data){
				console.log(data);
				callbackFun(data);
			});
		},
		updateVGroup : function(VGroup, callbackFun){
			if (!VGroup)
				return;

			var _siteId =  SYUtils.getUrlParam("siteId");

			var _VGroup = {
				siteId : _siteId,
				vgroupId : VGroup.uuid,
				title : VGroup.title,
				x : VGroup.x,
				y : VGroup.y
			};

			$.post('/updateVGroup', _VGroup, function(data){
				if (!!callbackFun)
					callbackFun(data);
			});
		}

	};

	return VSiteAjaxCtrl;
});