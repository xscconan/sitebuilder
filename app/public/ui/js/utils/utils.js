define( function(){
	var Utils = {
		getUrlParam : function(name){
			var locString = String(window.document.location.href);
		    var rs = new RegExp("(^|)"+name+"=([^\&]*)(\&|$)","gi").exec(locString), tmp;
		    return (tmp=rs)? tmp[2]:"";
		}
		// parseURLfromStr : function(Str, showStrLimitLen){
		// 	if (!Str || Str.length == 0)
		// 		return;
			
		// 	var isUrl = false;
		// 	var tmp = Str.replace(_AppUtil.getUrlReg(), function($1){
		// 		var url = $1.toLowerCase();
		// 		var href = (url.indexOf("http") == -1)? 'http://'+ url: url;
		// 		if(!!showStrLimitLen)
		// 			url = _AppUtil.subString(url, 20, '...');
		// 		isUrl = true;
		// 		return "<a href='" + href + "' target='_blank'>" + url + "</a>";
		// 	});
			
			
		// 	return tmp;
		//  },
	};

	return Utils;

});