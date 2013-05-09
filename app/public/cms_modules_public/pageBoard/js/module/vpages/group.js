define(['vpages/vpageEvent', 'controller/vsiteAjaxController', 'meta/shareObj'],
 function(VPageEvent, VSiteAjaxCtrl, ShareObj){
	var VGroup = function(_drawBoard, vgroup){
		this.uuid = vgroup.vgroupId;
		this.x = vgroup.x || 10;
		this.y = vgroup.y || 10;
		this.drawBoard = _drawBoard;
		this.width = 200;
		this.height = 80;
		this.r = 10;
		this.isVGroup = true;
		this.color = "#606060";
		this.title = "New VPage Group";
		/*
		*  this.vpagesBtns.vpagename.count
		*  this.vpagesBtns.vpagename.group
		*  this.vpagesBtns.typeCount
		*/
		this.vpagesBtns = {"typeCount" : 0};

		//including not showing vpages on borad
		this.includeVpages = [];

		this.inboundLinesId = [];

		//vpage node only
		this.referEndNode = [];

		this.textOffset = {
			x: 20,
			y: 14
		}
	}

	VGroup.prototype.createGroup = function(_x, _y){

		this.group = this.drawBoard.set();

		var vpItemX = _x || parseInt(this.x);
		var vpItemY = _y || parseInt(this.y);

		this.x = vpItemX;
		this.y = vpItemY;

		this.group.push(
		    this.drawBoard.rect(vpItemX, vpItemY, this.width, this.height, this.r).attr({
				"fill-opacity": 80,
				"fill": this.color,
				"opacity": 0.8
		    }),
		    this.drawBoard.rect(vpItemX, vpItemY, this.width, 30, this.r).attr({
		    	stroke: this.color,
				"fill": this.color,
				"opacity": 0.5,
				"cursor" : "move"
		    }),
		    this.drawBoard.text(vpItemX + this.textOffset.x, vpItemY + this.textOffset.y, this.title).attr({
	    		"font-size" : 12,
				"font-weight" : 'normal',
				"text-anchor" : 'start',
				"fill": "#fff"
		    })
		);

		var thisVGroup = this;

		this.group[0].isGroupBox = true;
		this.group[0].vgroupId =  thisVGroup.uuid;

		this.group[2].resetPostion = function(ThisVGroup){
			var _x =  this.attrs.x + ThisVGroup.textOffset.x;
			var _y =  this.attrs.y + ThisVGroup.textOffset.y;
			this.attr({x: _x, y: _y});
		}

		//VPage drag event
		this.group[1].drag(function(x, y, mx, my){
			VPageEvent.move(x, y, mx, my, thisVGroup, this);
		},null,
		function(){
			thisVGroup.x = this.attrs.x;
			thisVGroup.y = this.attrs.y;
			VSiteAjaxCtrl.updateVGroup(thisVGroup);
		});

		ShareObj.vgroupList[this.uuid] = this;
	};

	VGroup.prototype.getFilterVpageBtnPostion = function(vgroupX, vgroupY, order){
		var result = {
			box :{
				x : vgroupX + 15,
				y : vgroupY + 40
			},
			num : {
				x : vgroupX + 26,
				y : vgroupY + 50
			}
		};

		if (this.vpagesBtns.typeCount > 1 && order >1)
		{
			var offsetX = order * 20;
			result.box.x += offsetX;
			result.num.x += offsetX;
		}

		return result;
	};

	VGroup.prototype.addFilterVpageBtn = function(thisVGroup, vpageType, count, color){
			this.vpagesBtns[vpageType] = {};
			this.vpagesBtns[vpageType].count = count;
			this.vpagesBtns[vpageType].color = color;
			this.vpagesBtns.typeCount ++;

			postion = this.getFilterVpageBtnPostion(this.x, this.y, this.vpagesBtns.typeCount);

			filterBtnGroup = this.drawBoard.set();
			filterBtnGroup.push(
				this.drawBoard.rect(postion.box.x, postion.box.y, 30, 20, 9).attr({
					"stroke": "#fff",
					"stroke-width": 2,
					"fill-opacity": 80,
					"fill": color,
					"opacity": 0.8,
					"cursor" : "pointer"
			    }),
			    this.drawBoard.text(postion.num.x, postion.num.y, this.vpagesBtns[vpageType].count).attr({
		    		"font-size" : 12,
					"font-weight" : 'normal',
					"text-anchor" : 'start',
					"fill": "#fff"
		    	})
		    );

			this.group.push( filterBtnGroup );
			this.vpagesBtns[vpageType].group = filterBtnGroup;

			var TheFilterGroup = this.group[this.group.length - 1];
			TheFilterGroup.order = this.vpagesBtns.typeCount;
			TheFilterGroup.resetPostion = function(_ThisVGroup, attr){
				var postion = _ThisVGroup.getFilterVpageBtnPostion(attr.x, attr.y, this.order);
				this[0].attr({x: postion.box.x, y: postion.box.y});
				this[1].attr({x: postion.num.x, y: postion.num.y});
			}
	}

	VGroup.prototype.setFilterVpageBtn = function(VPage, isSetCountColor){
		var filterBtnGroup;
		if (!this.vpagesBtns[VPage.vpage])
		{
			this.addFilterVpageBtn(this, VPage.vpage, 1, VPage.color);
		}
		else
		{
			this.vpagesBtns[VPage.vpage].count ++;
			filterBtnGroup = this.vpagesBtns[VPage.vpage].group;
			filterBtnGroup[1].attr({"text": this.vpagesBtns[VPage.vpage].count});
			if (!!isSetCountColor)
				filterBtnGroup[1].attr({"fill": "#F22E2E"})
		}
	
		this.group[0].attr({"opacity": 0.8});

	};
	
	return VGroup;
});