define(['jquery', 'vpageSampleBtns/message'], function($, MessagePageSample) {
     
        this._init = function(listBoard, drawBoard){
            MessagePageSample.createSampleBtn(listBoard, drawBoard);
        };

        return {
            init: _init
        }
    }
);