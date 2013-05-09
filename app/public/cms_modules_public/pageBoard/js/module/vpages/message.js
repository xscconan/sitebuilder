define(['vpages/vpage', 'meta/meta', 'SHARE_JS/libs/utils'], function(VPage, Meta, Utils){
	var MessagePage = function(_drawBoard, _VPage){
		this.drawBoard = _drawBoard;
		this.shape = 'rect';
		this.color = null;
		this.vpage = Meta.VPAGES.MSG_PAGE;
		this.uuid = _VPage.vpageId;
		this.typeId = _VPage.typeId;
		this.inboundLinesId = [];
		this.referEndNode = _VPage.referEndNode || [];
		this.comments = _VPage.comments || "";
		this.vgroupId = _VPage.vgroupId || null;

		this.info = {
			x : 10,
			y : 10,
			r : 10,
			fontSize : 12,
			defaultText : "New Message Page"
		}

		this.title = _VPage.title || this.info.defaultText;
	}

	MessagePage.prototype = new VPage;

	return MessagePage;
});