define(['vpageSampleBtns/vpageSample', 'meta/meta', 'vpages/message'], function(VpageSample, Meta, VPageClass){
	var MessagePageSample = function(_listBoard, _drawBoard){
		this.listBoard = _listBoard;
		this.drawBoard = _drawBoard;
		this.VPageClass = VPageClass;
		this.shape = 'rect';
		this.color = Raphael.getColor();
		this.vpage = Meta.VPAGES.MSG_PAGE;
		this.sample = {
			x : 10,
			y : 10,
			w : 200,
			h : 40,
			r : 10,
			fontSize : 14,
			defaultText : "Message Page"
		};
	}

	MessagePageSample.prototype = new VpageSample;

	return {
		createSampleBtn : function(listBoard, drawBoard){
			var msgPage = new MessagePageSample(listBoard, drawBoard);
			msgPage.sampleCreate();
		}
	}
});