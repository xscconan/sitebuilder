define(['jquery', 'meta/shareObj', 'controller/vpageAjaxController',
 'vpages/connectLine', 'UTILS/panels', 'util/util'],
 function($, ShareObj, VPageAjaxCtrl, ConnectLine, Panels, UTILS){
	var VPageController = {
		createVPageItem : function(VPageClass, drawBoard, VPage, callbackFun){
			if (!VPage.vpageId)
				return null;

			var vpageInstance = new VPageClass(drawBoard, VPage);
			vpageInstance.instanceCreate(VPage.x, VPage.y);
			ShareObj.vpageList[vpageInstance.uuid] = vpageInstance;
			return vpageInstance;
		},
		getVPageName : function(pageTypes, typeId){
			for (i in pageTypes)
			{
				if (pageTypes[i].typeId ==  typeId)
					return pageTypes[i].name;
			}
		},
		_initConnectLines : function(startNode){
			if (startNode.referEndNode.length > 0)
			{
				for (j in startNode.referEndNode)
				{
					var endVPageId = startNode.referEndNode[j]; 
					var endNode = ShareObj.vpageList[endVPageId];

					this.drawConnectLine(startNode, endNode);
				}
			}
		},
		switchVGroupLine : function(Vpage){
			if (!Vpage || Vpage.vgroupId == 'undefined') 
				return;
		
			ShareObj.vgroupList[Vpage.vgroupId].includeVpages.push(Vpage.uuid);

			for (i in Vpage.inboundLinesId)
			{
				var lineUUID =  Vpage.inboundLinesId[i];
				var statrtNodeId = lineUUID.replace(Vpage.uuid, '');
				var startNode = UTILS.getNodeInBoard(statrtNodeId);
				
				var Line = ShareObj.lineList[lineUUID];
				Line.removeInstance();

				this.drawConnectLine(startNode, Vpage);
			}

			for (i in Vpage.referEndNode)
			{
				var endNodeId = Vpage.referEndNode[i];
				var endNode = UTILS.getNodeInBoard(endNodeId);

				var Line = ShareObj.lineList[Vpage.uuid + endNode.uuid];
				Line.removeInstance();
				console.log(Vpage);
				console.log(endNode)
				this.drawConnectLine(Vpage, endNode);	
			}
		},
		initVpageLines : function(vpageInstances){
			for (i in vpageInstances)
			{
				var vpage = vpageInstances[i];
				this._initConnectLines(vpage);
			}
		},
		initVgroupOutboundLines : function(){
			//set vgroup outbound line
			var vgroupList = ShareObj.vgroupList;
			for (groupId in vgroupList)
			{
				var vgroup = vgroupList[groupId];
				this._initConnectLines(vgroup);
			}
		},
		drawConnectLine : function(_startNode, _endVpageNode){
			var _isDrawLine = false;
			// _startNode:  can be vgroup or vpage instance
			// _endVpageNode can be vpage instace or vpage object
			if (_startNode != null && _endVpageNode != null && !_endVpageNode.isVGroup)
			{
				//for make sure between start and end only one line
				var startNodeTmp = UTILS.getNodeInBoard(_startNode.uuid);
				_endVpageNode.uuid = _endVpageNode.uuid || _endVpageNode.vpageId;
				var endNodeTmp = UTILS.getNodeInBoard(_endVpageNode.uuid) || _endVpageNode;

				// tow vpage include in same vgroup
				if (startNodeTmp.uuid == endNodeTmp.uuid)
					return;

				var lineUUID = startNodeTmp.uuid + endNodeTmp.uuid;

				if (!ShareObj.lineList[lineUUID])
				{
					var clInstance = new ConnectLine();
					clInstance.drawLine(startNodeTmp, endNodeTmp, _endVpageNode.uuid);
					ShareObj.lineList[clInstance.uuid] = clInstance;

					//_startNode is vpage, if _endVpageNode uuid is not included, than push it
					if (!!_startNode.isVPage && $.inArray(_endVpageNode.uuid, _startNode.referEndNode) == -1)
						_startNode.referEndNode.push(_endVpageNode.uuid);

					//startNodeTmp is vgroup, if _endVpageNode uuid is not included, than push it
					if (!!startNodeTmp.isVGroup && $.inArray(_endVpageNode.uuid, startNodeTmp.referEndNode) == -1)
						startNodeTmp.referEndNode.push(_endVpageNode.uuid);
					
					endNodeTmp.inboundLinesId.push(clInstance.uuid);
					_isDrawLine = true;
				}
				
			}

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