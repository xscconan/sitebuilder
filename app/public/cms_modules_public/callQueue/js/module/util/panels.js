define([ 'jquery', 'meta/ShareObj', 'SYLIB/mustache', 'UTILS/panels'], function($, ShareObj, Mustache, Panel){
	var Panels = {
		getHubSelectorHtml : function(_id, selectedArray){
			var _ValueObj = [];

			for (id in  ShareObj.CallHubList)
			{
				var tmpHub = ShareObj.CallHubList[id];
				
				_ValueObj.push("<li value='");
				_ValueObj.push(tmpHub.uuid);
				_ValueObj.push("' ");

				if (
						!!selectedArray && selectedArray.length > 0 &&  
						$.inArray(tmpHub.uuid, selectedArray) != -1
					)
					_ValueObj.push("class='selected'");
				
				_ValueObj.push(">");
				_ValueObj.push(tmpHub.name);
				_ValueObj.push("</li>");
			}

			var content = _ValueObj.join("");

			return Panel.MultipleSelector.getHtml({
				"id" : _id
			}, content);
		}
	};

	return Panels;

});