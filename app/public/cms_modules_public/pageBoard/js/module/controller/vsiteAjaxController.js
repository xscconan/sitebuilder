define(['jquery'], function($){
	var VSiteAjaxCtrl = {
		createNewSite : function(VSite, callbackFun){
			VSiteObj = {
				siteName : VSite.siteName
			};

			$.post('/newVSite', VSiteObj, function(data){
				callbackFun(data);
			});
		}


	};

	return VSiteAjaxCtrl;
});