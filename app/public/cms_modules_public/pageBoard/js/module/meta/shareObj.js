define(function(){
	var shareObj = {
		'dragingVpage' : null,
		'dragOverGroupRo' : null,
		'mouseLine' : {
			'roId' : null,
			'startNode' : null,
			'endNode' : null
		},
		'drawBoard' : {}, //drawBoard infomation e.g width, height
		'vpageList' : {}, //global vpages
		'vgroupList' : {}, //global vgroup
		'lineList' : {}, //global line
		VPAGE : {
			W : 160,
			H : 40,
			COLOR : {
				menu : "#7CBF00",
				message : "#BF5600"
			}
		}
	};

	return shareObj;
});