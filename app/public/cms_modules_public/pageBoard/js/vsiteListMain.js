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
require(['jquery', 'topBar', 'UTILS/panels', 'vsiteList'], 
    function ($, topBar, Panel, VSiteList) {
        topBar.init();
        VSiteList.init();
});
