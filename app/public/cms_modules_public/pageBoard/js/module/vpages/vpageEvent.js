define(['meta/shareObj', 'vpages/connectLine', 'UTILS/panels', 'controller/vpageAjaxController', 'vpageContentTmp/vpage'],
 function(ShareObj, ConnectLine, Panels, VPageAjaxCtrl, vpageEditTmp){

	var VPageEvent = {
		'isForMouseLine' : function(ThisDragType, isArrow){
			if (ThisDragType == "image" || !!isArrow)
				return true;
			return false;
		},
		'startDrag' : function(x, y, ThisVpage, ThisDrag, isArrow){
			if (this.isForMouseLine(ThisDrag.type, isArrow))
			{
				ThisVpage.group[2].hide();
				var mouseLineRo = ThisVpage.drawBoard.getById(ShareObj.mouseLine.roId);
				mouseLineRo.show();
				ShareObj.mouseLine.startNodeRo = ThisVpage;
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
				//body move
				var att = {x: mx - ShareObj.drawBoard.left - 20, y: my - ShareObj.drawBoard.top -50};
				var count = ThisVpage.group.length;

	            for (var i = 0; i < count; i++)
	            {
	            	var dragItem = ThisVpage.group[i];
	            	dragItem.attr(att);

	            	if (!!dragItem.resetPostion)
	            		dragItem.resetPostion(ThisVpage);
	            }

	            for (var lineUUID in  ThisVpage.connectLines) {
                	ThisVpage.connectLines[lineUUID].reSetLine();
           		}

            	ThisVpage.drawBoard.safari();
			}
		},
		'stopDragAndDrawLine' : function(ThisVpage, ThisDrag, isArrow){
			if (this.isForMouseLine(ThisDrag.type, isArrow))
			{
				ThisVpage.group[2].hide();
				var mouseLineRo = ThisVpage.drawBoard.getById(ShareObj.mouseLine.roId);
				mouseLineRo.hide().attr({path: 'M0,0L0,0'});
		
				return this.drawConnectLine();
			}
			else
			{
				var gapW = ThisDrag.attrs.x - ThisVpage.x;
				var gapH = ThisDrag.attrs.y - ThisVpage.y;
				if (ThisDrag.type == "text")
				{
					gapW -= ThisVpage.textOffset.x;
					gapH -= ThisVpage.textOffset.y;
				}

				if (Math.abs(gapW)> 2 || Math.abs(gapH)> 2 )
				{	
					ThisVpage.x = ThisDrag.attrs.x;
					ThisVpage.y = ThisDrag.attrs.y;
					VPageAjaxCtrl.updateVpages(ThisVpage);
				}
			}
		},
		drawConnectLine : function(){
			require(['controller/vpageController'], function(VPageCtrl){
				var _startNodeRo = ShareObj.mouseLine.startNodeRo;
				var _endNodeRo = ShareObj.mouseLine.endNodeRo;
				var _isDrawLine = VPageCtrl.drawConnectLine(_startNodeRo, _endNodeRo, true);

				ShareObj.mouseLine.startNodeRo = null;
				ShareObj.mouseLine.endNodeRo = null;
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
			var startNodeVPage = ShareObj.mouseLine.startNodeRo;

			if (!startNodeVPage)
				thisVpage.group[2].show();
			else if (ShareObj.mouseLine.startNodeRo.uuid != thisVpage.uuid){
				// line hover the other vpage node
				ShareObj.mouseLine.endNodeRo = thisVpage;
			}
		},
		'mouseHoverOut' : function(thisVpage){
			thisVpage.group[2].hide();
		},
		'clickOpenDetail' : function(thisVpage, ThisDrag){
			var vpageRectAttrs = thisVpage.group[0].attrs;
			var width = 300;
			var height = 200;
			var x = vpageRectAttrs.x + vpageRectAttrs.width + ShareObj.drawBoard.left + 20;			var y = vpageRectAttrs.y + vpageRectAttrs.height / 2 + ShareObj.drawBoard.top - height/2;

			var arrowPanelId = Panels.Arrow.ajaxPopup(thisVpage.uuid, 'left', x, y, width, height);
			var vpageEditTmpObj = vpageEditTmp.getTmp(thisVpage);
			$("#" + arrowPanelId).find('.container').html(vpageEditTmpObj.content);
			Panels.PopupPanel.btnsEventListen(vpageEditTmpObj.buttonsObj, arrowPanelId);
		}
	};

	return VPageEvent;
});