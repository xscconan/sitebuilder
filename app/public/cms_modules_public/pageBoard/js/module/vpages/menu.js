define(['vpages/vpage', 'meta/meta', 'SHARE_JS/libs/utils'], function(VPage, Meta, Utils){
	var MenuPage = function(_drawBoard, _VPage){
		this.drawBoard = _drawBoard;
		this.shape = 'rect';
		this.color = '#7CBF00';
		this.vpage = Meta.VPAGES.MENU_PAGE;
		this.uuid = _VPage.vpageId;
		this.connectLines = {};
		this.typeId = _VPage.typeId;
		this.referEndNode = _VPage.referEndNode || [];
		this.comments = _VPage.comments || "";
		
		this.info = {
			x : 10,
			y : 10,
			w : 200,
			h : 40,
			r : 30,
			fontSize : 12,
			defaultText : "New Menu Page"
		}

		this.title = _VPage.title || this.info.defaultText;
	}

	MenuPage.prototype = new VPage;

	return MenuPage;
});