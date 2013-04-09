define(['jquery', 'util/util', 'meta/shareObj', 'vpages/vpageEvent'], 
	function($, Utils, ShareObj, VPageEvent) {

	var VPage = function(){
		this.group = null;
		this.textOffset = {
			x: 20,
			y: 20
		};
		this.connectorIcon = {
			offsetX: 140,
			offsetY: 14
		};
	};

	VPage.prototype.instanceCreate = function(_x, _y){
		this.group = this.drawBoard.set();
		var thisVpage = this;

		var vpItemX = parseInt(_x) || this.info.x;
		var vpItemY = parseInt(_y) || this.info.y;

		if (!!ShareObj.dragingVpage)
		{
			vpItemX = parseInt(ShareObj.dragingVpage.x) || 0;
			vpItemY = parseInt(ShareObj.dragingVpage.y) || 0;
		}

		this.x = vpItemX;
		this.y = vpItemY;

		this.group.push(
		    this.drawBoard[this.shape](vpItemX, vpItemY, this.info.w, this.info.h, this.info.r).attr({
	    		stroke: this.color,
				"fill-opacity": 100,
				"stroke-width": 2,
				"fill": this.color,
				"cursor" : "move"
		    }),
		    this.drawBoard.text(vpItemX + this.textOffset.x, vpItemY + this.textOffset.y, this.title).attr({
	    		"font-size" : this.info.fontSize,
				"font-weight" : 'normal',
				"text-anchor" : 'start',
				"fill": "#fff",
				"cursor" : "move"
		    }),
		     this.drawBoard.image("./cms_modules_public/pageBoard/img/connector.png", vpItemX + this.connectorIcon.offsetX, vpItemY + this.connectorIcon.offsetY, 15, 15)
		     .hide()
		     .attr({
				cursor: "pointer"
			})
		);

		if (!!this.comments || this.comments.length == 0)
			this.group.attr( { "title" : this.comments} );


		this.group[1].resetPostion = function(ThisVpage){
			var _x =  this.attrs.x + ThisVpage.textOffset.x;
			var _y =  this.attrs.y + ThisVpage.textOffset.y;
			this.attr({x: _x, y: _y});
		}

		this.group[2].resetPostion = function(ThisVpage){
			var _x =  this.attrs.x + ThisVpage.connectorIcon.offsetX;
			var _y =  this.attrs.y + ThisVpage.connectorIcon.offsetY;
			this.attr({x: _x, y: _y});
		}


		//VPage drag event
		this.group.drag(function(x, y, mx, my){
			VPageEvent.move(x, y, mx, my, thisVpage, this);
		}, 
		function(x, y){
			//Just for connect icon drag in vpage group
			VPageEvent.startDrag(x, y, thisVpage, this);
		},
		function(){
			//Just for connect icon drag in vpage group
			VPageEvent.stopDragAndDrawLine(thisVpage, this);
		});

		//Mouse hover vpage, show connect icon
		this.group.hover(function(){
			VPageEvent.mouseHoverIn(thisVpage);
		}, function(){
			VPageEvent.mouseHoverOut(thisVpage);
		});

		//Open the vpage detail
		this.group.dblclick(function(){
			VPageEvent.clickOpenDetail(thisVpage, this);
		});
	};

	VPage.prototype.removeInstance = function(){
		this.group.remove();
	};

	VPage.prototype.resetUI = function(){
		this.group.attr( { "title" : this.comments} );
		this.group[1].attr('text', this.title);
	};


	return VPage;
});