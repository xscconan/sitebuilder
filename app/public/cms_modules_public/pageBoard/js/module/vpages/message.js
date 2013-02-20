define(['vpages/vpage', 'meta/meta', 'SHARE_JS/utils'], function(VPage, Meta, Utils){
	var MessagePage = function(_drawBoard){
		this.drawBoard = _drawBoard;
		this.shape = 'rect';
		this.color = Raphael.getColor();
		this.vpage = Meta.VPAGES.MSG_PAGE;
		this.uuid = Utils.UUID();
		this.connectLines = {};

		this.instance = {
			x : 10,
			y : 10,
			w : 160,
			h : 40,
			r : 10,
			fontSize : 12,
			defaultText : "New Message Page"
		}
	}

	MessagePage.prototype = new VPage;

	return MessagePage;
});