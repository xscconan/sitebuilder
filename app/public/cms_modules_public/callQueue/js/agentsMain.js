requirejs.config({
    baseUrl: '/cms_modules_public/callQueue/js/module/',
    paths: {
        "SYLIB" : '/ui/js/libs',
        "META" : '/ui/js/meta',
        "UTILS" : '/ui/js/utils',
        "SHARE_JS" : '/sharedJs',
        "jquery" : '/sharedJs/libs/jquery-1.9.0.min',
        "farbtastic" :  "/ui/jQueryPlugins/farbtastic/farbtastic"
    },
    shim : {
        "farbtastic" : ["jquery"]
    }
});

// Start the main logic.
require(['jquery','controller/agentsLeftBar', 'controller/agentsMainBox', 'UTILS/panels', 'controller/cqAjaxController', 'farbtastic'], 
    function ($, leftBar, mainBox, Panel, CQAjaxCtrl) {

    CQAjaxCtrl.getAgentReferDatas(function(data){
        leftBar.init(data);
        mainBox.init(data, function(){
            Panel.MaskLayour.remove();
            Panel.PopupPanel.removePanelById("loadingData");
        });
     });

    Panel.MaskLayour.insert();
    Panel.PopupPanel.insertLoadingPanel("loadingData", "Loading...", null, true);

});
