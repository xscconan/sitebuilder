define(['vpageSampleBtns/vpageSample', 'meta/meta', 'vpages/message'], function(VpageSample, Meta, VPageClass){
	var MessagePageSample = function(_listBoard, _drawBoard, _typeId){
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
			w : 200,
			h : 40,
			r : 10,
			fontSize : 14,
			defaultText : "Message Page"
		};
	}

	MessagePageSample.prototype = new VpageSample;

	return {
		createSampleBtn : function(listBoard, drawBoard, i, typeId){
			var page = new MessagePageSample(listBoard, drawBoard, typeId);
			page.sample.y += i * page.sample.h * 1.2;
			page.sampleCreate();
		}
	}
});