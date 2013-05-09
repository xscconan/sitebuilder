define(['jquery', 'util/util', 'meta/shareObj', 'vpages/vpageEvent'], 
	function($, Utils, ShareObj, VPageEvent) {

	var VPage = function(){
		this.isVPage = true;
		this.group = null;
		this.width = ShareObj.VPAGE.W;
		this.height = ShareObj.VPAGE.H;
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

		this.color = ShareObj.VPAGE.COLOR[this.vpage];

		if (!!ShareObj.dragingVpage)
		{
			vpItemX = parseInt(ShareObj.dragingVpage.x) || 0;
			vpItemY = parseInt(ShareObj.dragingVpage.y) || 0;
		}

		this.x = vpItemX;
		this.y = vpItemY;

		this.group.push(
		    this.drawBoard[this.shape](vpItemX, vpItemY, this.width, this.height, this.info.r).attr({
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
				"cursor" : "default"
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
			if (this.type != "text")
			{
				thisVpage.group.toFront();
				VPageEvent.move(x, y, mx, my, thisVpage, this);
			}
		}, 
		function(x, y){
			//Just for connect icon drag in vpage group
			if (this.type != "text")
				VPageEvent.startDrag(x, y, thisVpage, this);
		},
		function(){
			if (this.type != "text")
				VPageEvent.stopDragAndDrawLine(thisVpage, this);
		});

		this.group[0].onDragOver(function(vgroupRo){
			VPageEvent.dragOverGroup(vgroupRo);
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
		this.group.animate({width: 20, height: 20}, 50, function(){
            this.animate({opacity: 0}, 100, function(){
              this.remove();
            });
        });
	};

	VPage.prototype.resetUI = function(){
		this.group.attr( { "title" : this.comments} );
		this.group[1].attr('text', this.title);
	};

	return VPage;
});