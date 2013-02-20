define([ 'mainBoard'], function(MainBoard){
	var Utils = {
		'isMoveInDrawBoard' : function(x, y){
			var t_left = x + 20;
			var t_top = y;
			var d_left = MainBoard.DrawBoard.left;
			var d_top = MainBoard.DrawBoard.top;
			var d_w = MainBoard.DrawBoard.width;
			var d_h = MainBoard.DrawBoard.height;

			if (
					t_left > d_left && (t_left - 160) < (d_left + d_w) &&
					t_top > d_top && (t_top < (d_top + d_h))
				)
				return true;
			return false;
		}
	};

	return Utils;

});