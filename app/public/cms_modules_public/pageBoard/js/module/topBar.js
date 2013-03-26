define(['jquery', 'UTILS/panels', 'vpageContentTmp/siteCreatePanel'], function($, Panel, SiteCreatePanelTmp) {
    
    var _DO_CREATER_NEW_SITE = "createNewSite";

    var _doCreateNewSite = function(){
    	Panel.MaskLayour.insert();
      Panel.PopupPanel.insert(_DO_CREATER_NEW_SITE, SiteCreatePanelTmp.title, SiteCreatePanelTmp.body, function(){
            Panel.MaskLayour.remove();
      });
      Panel.PopupPanel.btnsEventListen(SiteCreatePanelTmp.buttonsObj, _DO_CREATER_NEW_SITE);
    };

    this._init = function(){
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

    };

    return {
        init: _init
    }
});