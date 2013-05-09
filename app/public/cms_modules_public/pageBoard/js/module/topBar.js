define(['jquery', 'UTILS/panels', 'vpageContentTmp/siteCreatePanel',
  'util/util', 'meta/shareObj', 'vpages/group', 'controller/vsiteAjaxController'
], 
  function($, Panel, SiteCreatePanelTmp, Utils, ShareObj, VGroup, VSiteAjaxCtrl) {
    
    var _DO_CREATER_NEW_SITE = "createNewSite";

    var _doCreateNewSite = function(){
    	Panel.MaskLayour.insert();
      Panel.PopupPanel.insert(_DO_CREATER_NEW_SITE, SiteCreatePanelTmp.title, SiteCreatePanelTmp.body, function(){
            Panel.MaskLayour.remove();
      });
      Panel.PopupPanel.btnsEventListen(SiteCreatePanelTmp.buttonsObj, _DO_CREATER_NEW_SITE);
    };

    var _GroupCreator = {
      init : function(drawBoard){
         var vpageShapeBoxJo = $('#vpageShapeBox');
         var createGroupJo =  $("#createGroup");
         createGroupJo.mousedown(function(event){
            vpageShapeBoxJo.fadeIn();
            vpageShapeBoxJo.offset({top: event.pageY -20, left: event.pageX -20});
            $(this).data('moveType', 'group');
         });

          $('body').mousemove(function(event){
            var _isMoveInDropPlace = Utils.isMoveInDrawBoard(event.pageX, event.pageY -20 );
            vpageShapeBoxJo.offset({top: event.pageY -20, left: event.pageX -20});
            if (_isMoveInDropPlace)
                vpageShapeBoxJo.addClass('moveIn');
            else
                vpageShapeBoxJo.removeClass('moveIn');
          }).mouseup(function(event){
              vpageShapeBoxJo.fadeOut();
              var _isMoveInDropPlace = Utils.isMoveInDrawBoard(event.pageX, event.pageY -20 );
              
               if (_isMoveInDropPlace)
                  _GroupCreator.preCreateNewGroup(event, drawBoard);
               createGroupJo.data('moveType', '');
         });
      },
      preCreateNewGroup : function(event, drawBoard){
          var moveType = $("#createGroup").data('moveType');
          if (moveType == "group")
          {
              
              var _x = event.pageX - ShareObj.drawBoard.left;
              var _y = event.pageY - ShareObj.drawBoard.top - 35;


              var _vgroup = {
                  title : '',
                  x :  _x,
                  y : _y
              };
                
              VSiteAjaxCtrl.saveVGroup( _vgroup, function(data){
                if (data.created == "1" && !!data.vgroupId)
                {
                  var vgroup = new VGroup(drawBoard, data);
                  vgroup.createGroup(_x, _y);
                }
                else
                  alert('create fail!');

              });
             
          }
      }
    }

    this._init = function(drawBoard){
       $("#operator").mouseover(function(){
       		$(this).addClass('panelBg1');
       }).mouseout(function(){
       		$(this).removeClass('panelBg1');
       }).click(function(){
       		$("#operations").slideToggle();
       });

       var This = this;
       $("#vSiteSwitcher").change(function(){
       		if ($(this).val() == _DO_CREATER_NEW_SITE)
       			_doCreateNewSite();
       });

       _GroupCreator.init(drawBoard);

    };

    return {
        init: _init,
        doCreateNewSite : _doCreateNewSite
    }
});