define(['vpageSampleBtns/vpageInterface', 'meta/meta', 'vpages/message'], function(VpageInterface, Meta, VPageClass){
	var MessagePage = function(_listBoard, _drawBoard, _typeId){
		this.listBoard = _listBoard;
		this.drawBoard = _drawBoard;
		this.VPageClass = VPageClass;
		this.shape = 'rect';
		this.color = '#BF5600';
		this.vpage = Meta.VPAGES.MSG_PAGE;
		this.x = 0;
		this.y = 0;
		this.typeId = _typeId;

		this.sample = {
			x : 10,
			y : 10,
			r : 10,
			fontSize : 14,
			defaultText : "Message Page"
		};
	}

	return {
		createSampleBtn : function(listBoard, drawBoard, i, typeId){
			VpageInterface.createSampleBtn(MessagePage, listBoard, drawBoard, i, typeId);
		}
	}
});