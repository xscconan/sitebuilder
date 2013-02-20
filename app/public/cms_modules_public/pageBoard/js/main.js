requirejs.config({
    baseUrl: '/cms_modules_public/pageBoard/js/module/',
    paths: {
        "SYLIB" : '/ui/js/libs',
        "META" : '/ui/js/meta',
        "UTILS" : '/ui/js/utils',
        "SHARE_JS" : '/sharedJs/libs',
        "jquery" : '/sharedJs/libs/jquery-1.9.0.min',
        "VPAGR" : '/cms_modules_public/pageBoard/js/module/vpages/',
    }
});

// Start the main logic.
require(['jquery','leftBar', 'mainBoard'], function ($, leftBar, mainBoard) {
    var drawBoardJo = $("#drawBoard");
    var listBoard = Raphael("vpageLists", 320, 200);
    var drawBoard = Raphael("drawBoard", drawBoardJo.width(), drawBoardJo.height());

	leftBar.init(listBoard, drawBoard);
	mainBoard.init(drawBoard);
});