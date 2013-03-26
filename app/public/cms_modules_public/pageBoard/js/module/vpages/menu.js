define(['vpages/vpage', 'meta/meta', 'SHARE_JS/libs/utils'], function(VPage, Meta, Utils){
	var MenuPage = function(_drawBoard, _VPage){
		this.drawBoard = _drawBoard;
		this.shape = 'rect';
		this.color = Raphael.getColor();
		this.vpage = Meta.VPAGES.MENU_PAGE;
		this.uuid = _VPage.vpageId;
		this.connectLines = {};

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