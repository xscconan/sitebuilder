define(['jquery'], function($){
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
		}


	};

	return VSiteAjaxCtrl;
});