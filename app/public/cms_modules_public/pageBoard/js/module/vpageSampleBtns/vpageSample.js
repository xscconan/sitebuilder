define(['jquery', 'meta/shareObj', 'util/util', 'mainBoard'], function($, ShareObj, Utils, MainBoard) {
	var VpageSample = function(){};
	
	var _SampleDraggerStatus = {
		'OUT' : 'out',
		'IN' : 'in'
	};

	VpageSample.prototype.SampleEvent = {
		'startDrag' : function(x, y, THIS){
			var _left = 0;
			var _top = -1000;
			ShareObj.dragingVpage = {
				'pageName' : THIS.vpage
			} 
			$('#vpageShapeBox').offset({top: _top, left: _left});
			$('#vpageShapeBox').fadeIn();
		},
		'move' : function(x, y, mx, my, THIS){
			var _left = mx - THIS.sample.w + 20;
			var _top = my - 13;

			var _isMoveInDropPlace = Utils.isMoveInDrawBoard(mx, my);

			if (_isMoveInDropPlace && THIS.SampleDragger.status === 'out')
				THIS.SampleDragger.doMoveInDrawBoard();
			else if (!_isMoveInDropPlace && THIS.SampleDragger.status === 'in')
				THIS.SampleDragger.doMoveOutDrawBoard();

			$('#vpageShapeBox').offset({top: _top, left: _left});
		},
		'stopDrag' : function(THIS){	
			$('#vpageShapeBox').fadeOut();

			//the dragger is in drawing area and also dragingVpage is not null, create new vpage instance
			if (THIS.SampleDragger.status == _SampleDraggerStatus.IN && ShareObj.dragingVpage != null)
			{
				var offset = $('#vpageShapeBox').offset();
				ShareObj.dragingVpage.x = offset.left - MainBoard.DrawBoard.left - 5;
				ShareObj.dragingVpage.y = offset.top - MainBoard.DrawBoard.top - 40;
				var vpageInstance = new THIS.VPageClass(THIS.drawBoard);
				vpageInstance.instanceCreate(vpageInstance);
				ShareObj.vpageList[vpageInstance.uuid] = vpageInstance;
			}

			ShareObj.dragingVpage = null;
		}
	};

	VpageSample.prototype.SampleDragger = {
		'status' : 'out', 
		'doMoveInDrawBoard' : function(){
			this.status = _SampleDraggerStatus.IN;
			$('#vpageShapeBox').addClass('moveIn');
		},
		'doMoveOutDrawBoard' : function(){
			this.status = _SampleDraggerStatus.OUT;
			$('#vpageShapeBox').removeClass('moveIn');
		}
	};


	VpageSample.prototype.sampleCreate = function(){
		var st = this.listBoard.set();
		var THIS = this;

		st.push(
		    this.listBoard[this.shape](this.sample.x, this.sample.y, this.sample.w, this.sample.h, this.sample.r).attr({
	    		stroke: this.color,
				"fill-opacity": 100,
				"stroke-width": 2,
				"fill": this.color
		    }),
		    this.listBoard.text(this.sample.x + 50, this.sample.y + 18, this.sample.defaultText).attr({
	    		"font-size" : this.sample.fontSize,
				"font-weight" : 'normal',
				"text-anchor" : 'start',
				"fill": "#fff"
		    })
		);

		st.attr({
			cursor: "pointer"
		});

		st.drag(function(x, y, mx, my){
			THIS.SampleEvent.move(x, y, mx, my, THIS);
		}, 
		function(x, y){
			THIS.SampleEvent.startDrag(x, y, THIS);
		},
		function(){
			THIS.SampleEvent.stopDrag(THIS);
		});
	};

	return VpageSample;
});