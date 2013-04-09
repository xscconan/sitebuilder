define(['vpageSampleBtns/vpageSample', 'meta/meta', 'vpages/menu'], function(VpageSample, Meta, VPageClass){
	var MenuPageSample = function(_listBoard, _drawBoard, _typeId){
		this.listBoard = _listBoard;
		this.drawBoard = _drawBoard;
		this.VPageClass = VPageClass;
		this.shape = 'rect';
		this.color = '#7CBF00';
		this.vpage = Meta.VPAGES.MENU_PAGE;
		this.x = 0;
		this.y = 0;
		this.typeId = _typeId;

		this.sample = {
			x : 10,
			y : 10,
			w : 200,
			h : 40,
			r : 30,
			fontSize : 14,
			defaultText : "Menu Page"
		};
	}

	MenuPageSample.prototype = new VpageSample;

	return {
		createSampleBtn : function(listBoard, drawBoard, i, typeId){
			var page = new MenuPageSample(listBoard, drawBoard, typeId);
			page.sample.y += i * page.sample.h * 1.2;
			page.sampleCreate();
		}
	}
});