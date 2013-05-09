define(['vpageSampleBtns/vpageSample', 'vpageSampleBtns/vpageFilterBtn'], function(VpageSample, VpageFilterBtn){
	var VPageInterface = {
		createSampleBtn : function(VPage, listBoard, drawBoard, i, typeId){
			VPage.prototype = new VpageSample;
			
			var PageSampleBtn = new VPage(listBoard, drawBoard, typeId);
			PageSampleBtn.sample.y += i * PageSampleBtn.height * 1.2;
			PageSampleBtn.sampleCreate();
		}
		// creatVPageFilterBtnInGroup : function(VPage){
		// 	VPage.prototype = new VpageFilterBtn;
		// }
	};

	return VPageInterface;
});