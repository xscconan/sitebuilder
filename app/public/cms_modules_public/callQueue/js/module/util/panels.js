define([ 'jquery', 'meta/ShareObj', 'SYLIB/mustache'], function($, ShareObj, Mustache){
	var Panels = {
		getHubSelectorHtml : function(id, isMultiple){
			var tmp = [];
			var hasHub = false;
			tmp.push('<select size="4"');
			if (!!isMultiple)
				tmp.push('multiple id="');
			else
				tmp.push('id="');

			tmp.push(id);
			tmp.push('">');
			for (id in  ShareObj.CallHubList)
			{
				hasHub = true;
				var tmpHub = ShareObj.CallHubList[id];
				tmp.push('<option value="');
				tmp.push(tmpHub.uuid);
				tmp.push('">');
				tmp.push(tmpHub.name);
				tmp.push('</option>');
			}

			if (hasHub)
			{
				tmp.push('</select>')
				return tmp.join("");
			}
			
			return "";
		}
	};

	return Panels;

});