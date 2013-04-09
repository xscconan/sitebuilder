define(['jquery', 'controller/vsiteAjaxController', 'topBar'],
 function($, VSiteAjaxController, topBar){
	var VSiteList = {
		init : function(){
			$(".delVSiteBtn").click(function(){
				var vsiteid = $(this).attr('vsiteid');
				var THIS = this;
				VSiteAjaxController.delVSite(vsiteid, function(data){
					if (data == "1")
					{
						$(THIS).unbind();
						$("#vsite_" + vsiteid).fadeOut(100, function(){
							$(this).remove();
						})
					}
					else
						alert('fail!')
				});
			});

			$("#createVSite").click(function(){
				topBar.doCreateNewSite();
			});
		}
	};

	return VSiteList;
});