define(['meta/shareObj', 'vpages/connectLine', 'UTILS/panels', 'controller/vpageAjaxController', 
	'vpageContentTmp/vpage', 'controller/vpageController', 'util/util'],
 function(ShareObj, ConnectLine, Panels, VPageAjaxCtrl, vpageEditTmp, VPageCtrl, UTILS){

	var VPageEvent = {
		'isForMouseLine' : function(ThisDragType, isArrow){
			if (ThisDragType == "image" || !!isArrow)
				return true;
			return false;
		},
		'isDragOverGroup' : function(x, y){
			if (!!ShareObj.dragOverGroupRo)
			{	
				x -= ShareObj.drawBoard.left;
				y -= ShareObj.drawBoard.top;

				var width = ShareObj.VPAGE.W;
				var height = ShareObj.VPAGE.H;
				
				var minX = ShareObj.dragOverGroupRo.attrs.x - width + 30;
				var maxX = ShareObj.dragOverGroupRo.attrs.x + width;

				var minY = ShareObj.dragOverGroupRo.attrs.y + height - 30;
				var maxY = ShareObj.dragOverGroupRo.attrs.y + ShareObj.dragOverGroupRo.attrs.height + height;

				if ( x > minX && x < maxX && y > minY && y < maxY)
					return true
			}

			return false;
		},
		'startDrag' : function(x, y, ThisVpage, ThisDrag, isArrow){
			if (this.isForMouseLine(ThisDrag.type, isArrow))
			{
				ThisVpage.group[2].hide();
				var mouseLineRo = ThisVpage.drawBoard.getById(ShareObj.mouseLine.roId);
				mouseLineRo.show();
				ShareObj.mouseLine.startNode = ThisVpage;
			}
		},
		'move' : function(x, y, mx, my, ThisVpage, ThisDrag, isArrow){
			if (this.isForMouseLine(ThisDrag.type, isArrow))
			{
				//draw line
				this.mouseLineWithMove(x, y, mx, my, ThisVpage, ThisDrag);
			}
			else
			{
				//check group touched status
				if (!this.isDragOverGroup(mx, my))
				{
					if (!!ShareObj.dragOverGroupRo)
						ShareObj.dragOverGroupRo.attr({"opacity": 0.8});
					ShareObj.dragOverGroupRo = null;
				}

				//body move
				var att = {x: mx - ShareObj.drawBoard.left - 20, y: my - ShareObj.drawBoard.top -50};
				var count = ThisVpage.group.length;

	            for (var i = 0; i < count; i++)
	            {
	            	var dragItem = ThisVpage.group[i];
	            	if (dragItem.type != "set")
	            		dragItem.attr(att);

	            	if (!!dragItem.resetPostion)
	            		dragItem.resetPostion(ThisVpage, att);
	            }

	            this._resetLinesForNode(ThisVpage);

            	ThisVpage.drawBoard.safari();
			}
		},
		_resetLinesForNode : function(startNode){
			var referEndNodes = startNode.referEndNode;
			
            for (i in  referEndNodes) {
            	var startNodeTmp = UTILS.getNodeInBoard(startNode.uuid);
            	var endNode = UTILS.getNodeInBoard(referEndNodes[i]);
            	
             	if (!!endNode && !! startNodeTmp && startNodeTmp.uuid != endNode.uuid)
            	{
            		var lineUUID = startNodeTmp.uuid + endNode.uuid;
            		ShareObj.lineList[lineUUID].reSetLine();
            	}
            	
       		}

       		var inboundLinesId = startNode.inboundLinesId
       		for (i in inboundLinesId)
       		{
       			var lineUUID = inboundLinesId[i];
       			ShareObj.lineList[lineUUID].reSetLine();
       		}
		},
		'stopDragAndDrawLine' : function(ThisVpage, ThisDrag, isArrow){
			if (this.isForMouseLine(ThisDrag.type, isArrow))
			{
				ThisVpage.group[2].hide();
				var mouseLineRo = ThisVpage.drawBoard.getById(ShareObj.mouseLine.roId);
				mouseLineRo.hide().attr({path: 'M0,0L0,0'});
		
				return this._updateConnectLine();
			}
			else
			{
				if (!!ShareObj.dragOverGroupRo)
				{
					this.pushVpageIntoGroup(ThisVpage);
				}
				else
				{
					var gapW = ThisDrag.attrs.x - ThisVpage.x;
					var gapH = ThisDrag.attrs.y - ThisVpage.y;

					if (Math.abs(gapW)> 2 || Math.abs(gapH)> 2 )
					{	
						ThisVpage.x = ThisDrag.attrs.x;
						ThisVpage.y = ThisDrag.attrs.y;
						VPageAjaxCtrl.updateVpages(ThisVpage);
					}
				}
			}
		},
		pushVpageIntoGroup : function(ThisVpage){
			var vgroupId = ShareObj.dragOverGroupRo.vgroupId;
			var VGroup = ShareObj.vgroupList[vgroupId];

			VGroup.setFilterVpageBtn(ThisVpage, true);
			ThisVpage.vgroupId = VGroup.uuid;
			VPageAjaxCtrl.updateVpages(ThisVpage);
			VPageCtrl.switchVGroupLine(ThisVpage);
			ThisVpage.removeInstance();
		},
		_updateConnectLine : function(){
			require(['controller/vpageController'], function(VPageCtrl){
				var _startNode = ShareObj.mouseLine.startNode;
				var _endNode = ShareObj.mouseLine.endNode;

				if (!!_startNode && !!_endNode){
					ShareObj.vpageList[_startNode.uuid].referEndNode.push(_endNode.uuid);
				}
					
				
				VPageCtrl.drawConnectLine(_startNode, _endNode);
				VPageAjaxCtrl.updateVpages(_startNode);

				ShareObj.mouseLine.startNode = null;
				ShareObj.mouseLine.endNode = null;
			});
		},
		'mouseLineWithMove' : function(x, y, mx, my, ThisVpage, ThisDrag){
			var mouseLineRo = ThisVpage.drawBoard.getById(ShareObj.mouseLine.roId);
			var connectorIconRo = ThisVpage.group[2];
			var lineToX = mx - ShareObj.drawBoard.left;
			var lineToY = my - ShareObj.drawBoard.top - 20;
			var _path = ['M', connectorIconRo.attrs.x, ',' , connectorIconRo.attrs.y, 'L', lineToX,",", lineToY].join('');

			mouseLineRo.attr({path: _path});
		},
		'mouseHoverIn' : function(thisVpage){
			var startNodeVPage = ShareObj.mouseLine.startNode;

			if (!startNodeVPage)
				thisVpage.group[2].show();
			else if (ShareObj.mouseLine.startNode.uuid != thisVpage.uuid){
				// line hover the other vpage node
				ShareObj.mouseLine.endNode = thisVpage;
			}
		},
		'mouseHoverOut' : function(thisVpage){
			thisVpage.group[2].hide();
		},
		'clickOpenDetail' : function(thisVpage, ThisDrag){
			var vpageRectAttrs = thisVpage.group[0].attrs;
			var width = 300;
			var height = 200;
			var x = vpageRectAttrs.x + vpageRectAttrs.width + ShareObj.drawBoard.left + 20;
			var y = vpageRectAttrs.y + vpageRectAttrs.height / 2 + ShareObj.drawBoard.top - height/2;

			var arrowPanelId = Panels.Arrow.ajaxPopup(thisVpage.uuid, 'left', x, y, width, height);
			var vpageEditTmpObj = vpageEditTmp.getTmp(thisVpage);
			$("#" + arrowPanelId).find('.container').html(vpageEditTmpObj.content);
			Panels.PopupPanel.btnsEventListen(vpageEditTmpObj.buttonsObj, arrowPanelId);
		},
		dragOverGroup : function(vgroupRo){
			if (!!vgroupRo.isGroupBox && !ShareObj.dragOverGroup)
			{
				ShareObj.dragOverGroupRo = vgroupRo;
				ShareObj.dragOverGroupRo.attr({"opacity": 1});
			}
		}
	};

	return VPageEvent;
});