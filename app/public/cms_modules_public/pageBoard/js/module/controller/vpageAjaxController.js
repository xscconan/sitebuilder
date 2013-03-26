define(['jquery', 'UTILS/utils'], function($, SYUtils){
	var VPageAjaxCtrl = {
		'url' : '',

		getAllPages : function(callbackFun){
			var _siteId =  SYUtils.getUrlParam("siteId");
			$.post('/getVPages', {siteId : _siteId},  function(data){
				console.log(data);
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
			var _siteId =  SYUtils.getUrlParam("siteId");

			var _referEndNode = [];
			console.log(VPage);
			alert(234);
			for (Line in VPage.connectLines)
			{
				if (Line.stopVPageId != VPage.uuid)
					_referEndNode.push(Line.stopVPageId);
			}

			var _vpage = {
				siteId : _siteId,
				title : VPage.title,
				x : VPage.x,
				y : VPage.y,
				typeId : VPage.typeId,
				referEndNode : _referEndNode
			};

			console.log(_vpage);

			// $.post('/updateVPage', _vpage, function(data){
			// console.log(data);
			// 	callbackFun(data);
			// });
		},
		deleteVpages : function(){

		}


	};

	return VPageAjaxCtrl;
});