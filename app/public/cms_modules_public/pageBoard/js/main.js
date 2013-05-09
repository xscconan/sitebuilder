requirejs.config({
    baseUrl: '/cms_modules_public/pageBoard/js/module/',
    paths: {
        "SYLIB" : '/ui/js/libs',
        "META" : '/ui/js/meta',
        "UTILS" : '/ui/js/utils',
        "SHARE_JS" : '/sharedJs',
        "jquery" : '/sharedJs/libs/jquery-1.9.0.min',
        "VPAGR" : '/cms_modules_public/pageBoard/js/module/vpages/',
    }
});

// Start the main logic.
require(['jquery','leftBar', 'mainBoard', 'topBar', 'UTILS/panels', 'controller/vpageAjaxController'], 
    function ($, leftBar, mainBoard, topBar, Panel, VPageAjaxCtrl) {

    var drawBoardJo = $("#drawBoard");
    var listBoard = Raphael("vpageLists", 320, 200);
    var drawBoard = Raphael("drawBoard", drawBoardJo.width(), drawBoardJo.height());
    mainBoard.init(drawBoard);
    topBar.init(drawBoard);

    VPageAjaxCtrl.getAllPages(function(data){

        leftBar.init(listBoard, drawBoard, data.pageType);
        mainBoard.initVSites(data, drawBoard, function(){
            Panel.MaskLayour.remove();
            Panel.PopupPanel.removePanelById("loadingData");
        });
     });

    Panel.MaskLayour.insert();
    Panel.PopupPanel.insertLoadingPanel("loadingData", "Loading...", null, true);

});
