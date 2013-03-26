define(function() {
     
        this._init = function(listBoard, drawBoard, pageTypes){
            var SampleBtns = [];
            for (i in pageTypes)
                SampleBtns.push('vpageSampleBtns/' + pageTypes[i].name);
    
            require(SampleBtns, function(){
                for (i in arguments)
                    arguments[i].createSampleBtn(listBoard, drawBoard, i, pageTypes[i].typeId);
            });

        };

        return {
            init: _init
        }
    }
);