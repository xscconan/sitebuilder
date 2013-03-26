define(['jquery', 'meta/shareObj', 'controller/vpageController'], 
    function($, ShareObj, VPageCtrl) {

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

        var _initVPages = function(data, drawBoard, callbackFun){
            var vpagesObj = data.vsites[0].vpages || null;

            if (!vpagesObj || vpagesObj.length == 0)
                callbackFun();
            else
            {
                var vpages = [];
                for (i in vpagesObj)
                {
                    if (!vpagesObj[i].typeId)
                        continue;

                    var vpageFile = 'vpages/' + VPageCtrl.getVPageName(data.pageType, vpagesObj[i].typeId);
                    vpages.push(vpageFile);
                }

                if (vpages.length > 0)
                {
                    require(vpages, function(){
                        for (i in arguments)
                            VPageCtrl.createVPageItem(arguments[i], drawBoard, vpagesObj[i]);
                    });
                }

                callbackFun();
            }
        };

        return {
            init: _init,
            initVPages : _initVPages,
            'DrawBoard' : _DrawBoard
        }
});