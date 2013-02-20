define(['jquery','SYLIB/mustache'], function($, Mustache){
	var Panels = {
		'Arrow' : {
			tmp : '<div id="" class="arrow_box {{direction}}"><h1 class="logo">{{content}}</h1></div>',
			popup : function(_content, _direction, _hasCloseBtn){
				var _data = {
					content : _content,
					direction : _direction,
					hasCloseBtn : _hasCloseBtn
				};

				var contents = Mustache.render(this.tmp, _data);
				$('body').prepend(contents);
			}
		}
	};

	return Panels;
});