define(['vpageSampleBtns/vpageInterface', 'meta/meta', 'vpages/menu'], function(VpageInterface, Meta, VPageClass){
	var MenuPage = function(_listBoard, _drawBoard, _typeId){
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
			r : 30,
			fontSize : 14,
			defaultText : "Menu Page"
		};
	}

	return {
		createSampleBtn : function(listBoard, drawBoard, i, typeId){
			VpageInterface.createSampleBtn(MenuPage, listBoard, drawBoard, i, typeId);
		},
		// creatVPageFilterBtnInGroup : function(){
		// 	VpageInterface.creatVPageFilterBtnInGroup(MessagePage, drawBoard, typeId);
		// }
	}
});