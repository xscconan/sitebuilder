define(['jquery', 'meta/shareObj', 'controller/vpageController'], 
    function($, ShareObj, VPageCtrl) {


        var _init = function(drawBoard){

            var mouseLine = drawBoard.path().attr({
                stroke: "#55E00F",
                "stroke-width": 4,
                "stroke-dasharray": "- "
            });

            ShareObj.mouseLine.roId = mouseLine.id;

			var drawBoardJo = $('#drawBoard');

            ShareObj.drawBoard = {
                'left' : parseInt(drawBoardJo.css('left')),
                'top' : parseInt(drawBoardJo.css('top')),
                'width' : drawBoardJo.width(),
                'height' : drawBoardJo.height()
            };
        };

        var _initVPages = function(data, drawBoard, callbackFun){

            var vpagesObj = data.vpageList || null;

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
                        var vpageInstances = [];
                        for (i in arguments)
                        {
                            var Vpage = VPageCtrl.createVPageItem(arguments[i], drawBoard, vpagesObj[i]);
                            vpageInstances.push(Vpage);
                        }

                        // init vpage connect lines
                        VPageCtrl.initConnectLines(vpageInstances);
                    });
                }

                callbackFun();
            }
        };

        return {
            init: _init,
            initVPages : _initVPages
        }
});