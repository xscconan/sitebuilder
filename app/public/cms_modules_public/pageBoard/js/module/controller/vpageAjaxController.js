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
				typeId : VPage.typeId
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

			var _referEndNode = [];

			for (lid in VPage.connectLines)
			{
				var Line = VPage.connectLines[lid];
				if (Line.stopVPageId != VPage.uuid)
					_referEndNode.push(Line.stopVPageId);
			}

			var _vpage = {
				siteId : _siteId,
				vpageId : VPage.uuid,
				title : VPage.title,
				x : VPage.x,
				y : VPage.y,
				typeId : VPage.typeId,
				comments : VPage.comments,
				referEndNode : _referEndNode
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