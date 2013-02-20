define(['jquery', 'meta/shareObj'], function($, ShareObj) {

        var _DrawBoard = {
        	'left' : null,
        	'top' : null,
        	'width' : 0,
        	'height' : 0
        };

        var _init = function(drawBoard){

            var mouseLine = drawBoard.path().attr({
                stroke: "#55E00F",
                "stroke-width": 4,
                "stroke-dasharray": "- "
            });

            ShareObj.mouseLine.roId = mouseLine.id;

			var drawBoardJo = $('#drawBoard');
			_DrawBoard.left = parseInt(drawBoardJo.css('left'));
			_DrawBoard.top = parseInt(drawBoardJo.css('top'));
			_DrawBoard.width = drawBoardJo.width();
			_DrawBoard.height = drawBoardJo.height();
        };

        return {
            	init: _init,
            	'DrawBoard' : _DrawBoard
        }
});