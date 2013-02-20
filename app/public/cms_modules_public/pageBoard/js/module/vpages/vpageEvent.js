define(['mainBoard', 'meta/shareObj', 'vpages/connectLine', 'UTILS/panels'], function(MainBoard, ShareObj, ConnectLine, Panels){

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
				var att = {x: mx - MainBoard.DrawBoard.left - 20, y: my - MainBoard.DrawBoard.top -50};
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
		'stopDragAndDrawLine' : function(ThisVpage, ThisDrag, isArrow, _ConnectLine){
			if (this.isForMouseLine(ThisDrag.type, isArrow))
			{
				ThisVpage.group[2].hide();
				var mouseLineRo = ThisVpage.drawBoard.getById(ShareObj.mouseLine.roId);
				mouseLineRo.hide().attr({path: 'M0,0L0,0'});
		
				return this.drawConnectLine(_ConnectLine);
			}
		},
		'mouseLineWithMove' : function(x, y, mx, my, ThisVpage, ThisDrag){
			var mouseLineRo = ThisVpage.drawBoard.getById(ShareObj.mouseLine.roId);
			var connectorIconRo = ThisVpage.group[2];
			var lineToX = mx - MainBoard.DrawBoard.left;
			var lineToY = my - MainBoard.DrawBoard.top - 20;
			var _path = ['M', connectorIconRo.attrs.x, ',' , connectorIconRo.attrs.y, 'L', lineToX,",", lineToY].join('');

			mouseLineRo.attr({path: _path});
		},
		'drawConnectLine' : function(_ConnectLine){
			var _startNodeRo = ShareObj.mouseLine.startNodeRo;
			var _endNodeRo = ShareObj.mouseLine.endNodeRo;
			var _isDrawLine = false;
			
			ConnectLine = typeof ConnectLine == "undefined"? _ConnectLine: ConnectLine;

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

			ShareObj.mouseLine.startNodeRo = null;
			ShareObj.mouseLine.endNodeRo = null;

			return _isDrawLine;
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
			console.log(thisVpage.group[0]);
			var vpageRectAttrs = thisVpage.group[0].attrs;
			var width = 300;
			var height = 200;
			var x = vpageRectAttrs.x + vpageRectAttrs.width + MainBoard.DrawBoard.left + 20;
			var y = vpageRectAttrs.y + vpageRectAttrs.height / 2 + MainBoard.DrawBoard.top - height/2;

			Panels.Arrow.popup('123', 'left', x, y, width, height);
		}
	};

	return VPageEvent;
});