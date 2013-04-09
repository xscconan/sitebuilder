define(['vpages/vpage', 'meta/meta', 'SHARE_JS/libs/utils'], function(VPage, Meta, Utils){
	var MessagePage = function(_drawBoard, _VPage){
		this.drawBoard = _drawBoard;
		this.shape = 'rect';
		this.color = '#BF5600';
		this.vpage = Meta.VPAGES.MSG_PAGE;
		this.uuid = _VPage.vpageId;
		this.connectLines = {};
		this.typeId = _VPage.typeId;
		this.referEndNode = _VPage.referEndNode || [];
		this.comments = _VPage.comments || "";

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