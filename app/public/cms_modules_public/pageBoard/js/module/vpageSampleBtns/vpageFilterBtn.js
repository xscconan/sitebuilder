define(function(){
	var VPageFilterBtn = function(joinGroup){
		
	};

	VPageFilterBtn.prototype.createBtns = function(){

		this.joinGroup.push(
			this.drawBoard.rect(10, 20, this.width, this.height, this.info.r).attr({
	    		stroke: this.color,
				"fill-opacity": 100,
				"stroke-width": 2,
				"fill": this.color,
				"cursor" : "move"
		    })
		);
	};

	return VPageFilterBtn;
});