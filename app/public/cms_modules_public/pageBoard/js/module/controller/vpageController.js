define(['jquery', 'meta/shareObj'], function($, ShareObj){
	var VPageController = {
		createVPageItem : function(VPageClass, drawBoard, VPage, callbackFun){

								console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@');
					console.log(VPage);
			if (!VPage.vpageId)
				return;

				console.log('|||||||||||||||||||||');
					console.log(VPage);

			var vpageInstance = new VPageClass(drawBoard, VPage);
			vpageInstance.instanceCreate(VPage.x, VPage.y);
			ShareObj.vpageList[vpageInstance.uuid] = vpageInstance;
		},
		getVPageName : function(pageTypes, pageId){
			for (i in pageTypes)
			{
				if (pageTypes[i].typeId ==  pageId)
					return pageTypes[i].name;
			}
		} 
	}

	return VPageController;
});