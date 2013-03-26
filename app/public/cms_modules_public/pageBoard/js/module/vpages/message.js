define(['vpages/vpage', 'meta/meta', 'SHARE_JS/libs/utils'], function(VPage, Meta, Utils){
	var MessagePage = function(_drawBoard, _VPage){
		this.drawBoard = _drawBoard;
		this.shape = 'rect';
		this.color = Raphael.getColor();
		this.vpage = Meta.VPAGES.MSG_PAGE;
		this.uuid = _VPage.vpageId;
		this.connectLines = {};

		this.info = {
			x : 10,
			y : 10,
			w : 160,
			h : 40,
			r : 10,
			fontSize : 12,
			defaultText : "New Message Page"
		}

		this.title = _VPage.title || this.info.defaultText;
	}

	MessagePage.prototype = new VPage;

	return MessagePage;
});