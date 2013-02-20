define(['jquery', 'SYLIB/mustache', 'SHARE_JS/utils'], function($, Mustache, SUtils){
	var Panels = {
		'Arrow' : {
			tmp : '<div id="{{id}}" class="arrow_box {{direction}}"><div class="title">asdasd<span class="iconBtn closeBtn"></span></div><div class="container">{{content}}</div></div>',
			popup : function(_content, _direction, _x, _y, _width, _height, _hasCloseBtn){
				var _id =  SUtils.UUID();
				var _data = {
					id : _id,
					content : _content,
					direction : _direction,
					hasCloseBtn : _hasCloseBtn
				};

				var contents = Mustache.render(this.tmp, _data);
				$('body').prepend(contents);
				var theArrowJo = $("#" + _id);
				theArrowJo.offset({left: _x, top: _y});
				theArrowJo.width(_width);
				theArrowJo.height(_height);
			}
		}
	};

	return Panels;
});