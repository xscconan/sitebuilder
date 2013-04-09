define(['jquery', 'meta/shareObj', 'controller/vpageAjaxController', 'vpages/connectLine', 'UTILS/panels'],
 function($, ShareObj, VPageAjaxCtrl, ConnectLine, Panels){
	var VPageController = {
		createVPageItem : function(VPageClass, drawBoard, VPage, callbackFun){
			if (!VPage.vpageId)
				return null;

			var vpageInstance = new VPageClass(drawBoard, VPage);
			vpageInstance.instanceCreate(VPage.x, VPage.y);
			ShareObj.vpageList[vpageInstance.uuid] = vpageInstance;
			return vpageInstance;
		},
		getVPageName : function(pageTypes, pageId){
			for (i in pageTypes)
			{
				if (pageTypes[i].typeId ==  pageId)
					return pageTypes[i].name;
			}
		},
		initConnectLines : function(vpageInstances){
			for (i in vpageInstances)
			{
				var vpage = vpageInstances[i];
				if (vpage.referEndNode.length > 0)
				{
					for (j in vpage.referEndNode)
					{
						var _endVPageId = vpage.referEndNode[j]; 
						var _endNodeRo = ShareObj.vpageList[_endVPageId];
						this.drawConnectLine(vpage, _endNodeRo);
					}
				}
			}
		},
		drawConnectLine : function(_startNodeRo, _endNodeRo, isUpdate){
			var _isDrawLine = false;

			if (_startNodeRo != null && _endNodeRo != null)
			{
				var _lineUUID = _startNodeRo.uuid + _endNodeRo.uuid;
				//for make sure between start and end only one line
				if (!_startNodeRo.connectLines[_lineUUID])
				{
					var clInstance = new ConnectLine();
					clInstance.drawLine(_startNodeRo, _endNodeRo);

					_startNodeRo.connectLines[clInstance.uuid] = clInstance;
					_endNodeRo.connectLines[clInstance.uuid] = clInstance;
				}
				_isDrawLine = true;
			}
			
			if (!!isUpdate)
				VPageAjaxCtrl.updateVpages(_startNodeRo);

			return _isDrawLine;
		},
		popupVPageEditMore : function(VPage){
			var _DO_EDIT_VPAGE = "doEditVpageForMore";
			Panels.MaskLayour.insert();
			Panels.PopupPanel.insertLoadingPanel(_DO_EDIT_VPAGE, 'Edit VPage', function(){
			        Panels.MaskLayour.remove();
			});

			require(['vpageContentTmp/' + VPage.vpage], function(VPageEditMoreTmp){
			 	Panels.PopupPanel.updateContent(_DO_EDIT_VPAGE, VPageEditMoreTmp.title, VPageEditMoreTmp.content, VPageEditMoreTmp.buttonsObj);
			});
		}
	}

	return VPageController;
});