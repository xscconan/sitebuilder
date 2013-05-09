define(['jquery', 'meta/shareObj', 'controller/vpageController','vpages/group', 'SHARE_JS/libs/utils'], 
    function($, ShareObj, VPageCtrl, VGroup, ShareUtils) {
        var _groupMap = {};
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


        var _initVGroup = function(vgroupObj, drawBoard){
            for (i in vgroupObj)
            {
                var vgroup = new VGroup(drawBoard, vgroupObj[i]);
                vgroup.createGroup();
            }
        }


        var _initVpages = function(data, vpagesObj, drawBoard){
            var vpages = [];
               
            for (i in vpagesObj)
            {
                if (!vpagesObj[i].typeId)
                    continue;

                var vpageFile = 'vpages/' + VPageCtrl.getVPageName(data.pageType, vpagesObj[i].typeId);
                vpages.push(vpageFile);
            }
            
            require(vpages, function(){
                var vpageInstances = [], vgroup;

                for (i in arguments)
                {
                    var vpageTmp = vpagesObj[i];
                    if (!!vpageTmp.vgroupId)
                    {
                        vgroup = ShareObj.vgroupList[vpageTmp.vgroupId];
                        if (!!vgroup)
                        {
                            vpageTmp.vpage = VPageCtrl.getVPageName(data.pageType, vpageTmp.typeId);
                            vpageTmp.color = ShareObj.VPAGE.COLOR[vpageTmp.vpage];
                            vgroup.includeVpages.push(vpageTmp.vpageId);
                            vgroup.setFilterVpageBtn(vpageTmp);

                            if (!!vpageTmp.referEndNode && vpageTmp.referEndNode.length >0)
                                vgroup.referEndNode =  ShareUtils.ArrayUtil.mergeWithUniqueVal(vgroup.referEndNode, vpageTmp.referEndNode);
                     
                        }
                        ShareObj.vpageList[vpageTmp.vpageId] = vpageTmp;  
                    }
                    else
                    {
                        var Vpage = VPageCtrl.createVPageItem(arguments[i], drawBoard, vpagesObj[i]);
                        vpageInstances.push(Vpage);
                    }
                }

                // init vpage and vgroup connect lines
                VPageCtrl.initVpageLines(vpageInstances);
                VPageCtrl.initVgroupOutboundLines();
                vpageInstances = null;
            });
            
        }

        var _initVSites = function(data, drawBoard, callbackFun){

            var vpagesObj = data.vpageList || [];
            var vgroupObj = data.vgroupList || [];

            if (!!vgroupObj && vgroupObj.length > 0)
                _initVGroup(vgroupObj, drawBoard);

            if (!!vpagesObj && vpagesObj.length > 0)
                _initVpages(data, vpagesObj, drawBoard);
        
            callbackFun();
        };
        

        return {
            init: _init,
            initVSites : _initVSites
        }
});