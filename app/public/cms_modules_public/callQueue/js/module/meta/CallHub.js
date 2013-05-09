define(['jquery', 'SYLIB/mustache'], function($, Mustache){
	var CallHub = function(CallHub){
		this.uuid = CallHub.hubId;
		this.name = CallHub.name;
		this.count = CallHub.agents.length;
		this.color =  CallHub.color;
	}

	CallHub.prototype.getHtml = function(){
		var tmp = '<li class="callHub" id="{{uuid}}" ><span class="name">{{name}}</span> <span class="count">({{count}})</span></li>'

		 return Mustache.render(tmp, this);
	}

	CallHub.prototype.initCssStyle = function(){
		var css = 'border:1px solid {{color}};box-shadow: 0 1px 2px rgba(0,0,0,.2);background: {{color}};background: -webkit-gradient(linear, left top, left bottom, from(#E0DEDE), to({{color}}));background: -moz-linear-gradient(top,#E0DEDE, {{color}});'
		css = Mustache.render(css, this);

		$("#" + this.uuid).attr('style', css);
	}

	CallHub.prototype.insert = function(parentBoxId){
		$(parentBoxId).append(this.getHtml());
		this.initCssStyle();
	}

	return CallHub;
});