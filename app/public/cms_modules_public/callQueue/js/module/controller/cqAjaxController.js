define(function(){
	var CQAjaxCtrl = {
		getAgentReferDatas : function(callbackFun){
			$.post('/getAgReferData', function(data){
				callbackFun(data);
			});
		},
		writeNewCallHub : function(CallHub, callbackFun){
			var CallHub = {
				name : CallHub.name,
				color : CallHub.color
			};

			$.post('/wCallHub', CallHub, function(data){
				callbackFun(data);
			});
		},
		writeNewAgent : function(Agent, callbackFun){
			$.post('/wAgent', Agent, function(data){
				callbackFun(data);
			});
		}
	}

	return CQAjaxCtrl;
});