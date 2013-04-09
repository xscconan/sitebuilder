define([ 'jquery', 'meta/shareObj'], function($, ShareObj){
	var Panels = {
		'isMoveInDrawBoard' : function(x, y){
			var t_left = x + 20;
			var t_top = y;
			var d_left = ShareObj.drawBoard.left;
			var d_top = ShareObj.drawBoard.top;
			var d_w = ShareObj.drawBoard.width;
			var d_h = ShareObj.drawBoard.height;

			if (
					t_left > d_left && (t_left - 160) < (d_left + d_w) &&
					t_top > d_top && (t_top < (d_top + d_h))
				)
				return true;
			return false;
		}
	};

	return Panels;

});