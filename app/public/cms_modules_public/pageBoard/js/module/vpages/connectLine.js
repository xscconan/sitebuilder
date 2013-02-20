define(['VPAGR/vpageEvent', 'meta/shareObj'],  function(VPageEvent, ShareObj){

	var ConnectLine = function(){
		this.line = null;
		this.color = "#16995C";
		this.uuid = null;
		this.TriH = 9;

		this.startVPageId = null;
		this.stopVPageId = null;
	};

	ConnectLine.prototype.drawLine = function(startNodeRo, endNodeRo){
		//group 0 is rect

		var _color = this.color;
		var _drawBoard = startNodeRo.drawBoard;
		var _startRectRo = startNodeRo.group[0];
		var _endRectRo = endNodeRo.group[0];
		var _path = this.getLinePath(startNodeRo.group[0], endNodeRo.group[0]);
		var _pathLine = _path.join(",");

		var _pathLen = _path.length;
		var _fx = _path[_pathLen-4] - this.TriH;
		var _fy = _path[_pathLen-5] - this.TriH;
		var _tx = _path[_pathLen-2];
		var _ty = _path[_pathLen-1];
		var _pathTri = this.getTrianglePath(_fx, _fy , _tx, _ty);

		var _bg = "";

		this.startVPageId = startNodeRo.uuid;
		this.stopVPageId = endNodeRo.uuid;

        this.line = {
            bg: _bg && _bg.split && _drawBoard.path(_pathLine).attr({stroke: _bg.split("|")[0], fill: "none", "stroke-width": _bg.split("|")[1] || 3}),
            line: _drawBoard.set(),
            from: _startRectRo,
            to: _endRectRo
        };

        this.line.line.push(
        	_drawBoard.path(_pathLine).attr({stroke: _color, fill: "none"}),
        	_drawBoard.path(_pathTri).attr({stroke: _color, fill: _color, "cursor" : "move"})
        );

        ThisLine = this;

        this.line.line[1].idGroup = [this.line.line[0].id, this.line.line[1].id];
        this.line.line[1].startVPageId = startNodeRo.uuid;
        this.line.line[1].stopVPageId = endNodeRo.uuid;

        this.line.line[1].hover(function(){
        	var lineRo = _drawBoard.getById(this.idGroup[0]);
        	var arrowRo = _drawBoard.getById(this.idGroup[1]);

        	lineRo.attr({stroke: "red"});
        	arrowRo.attr({fill: "red"});
        }, function(){
        	var lineRo = _drawBoard.getById(this.idGroup[0]);
        	var arrowRo = _drawBoard.getById(this.idGroup[1]);

        	lineRo.attr({stroke: ThisLine.color});
        	arrowRo.attr({fill: ThisLine.color});
        });

        this.line.line.drag(function(x, y, mx, my){
        	var lineRo = _drawBoard.getById(this.idGroup[0]);
        	var arrowRo = _drawBoard.getById(this.idGroup[1]);

        	lineRo.hide();
        	arrowRo.hide();
			VPageEvent.move(x, y, mx, my, startNodeRo, this, true);
		}, 
		function(x, y){
			VPageEvent.startDrag(x, y, startNodeRo, this, true);
		},
		function(){
			var lineRo = _drawBoard.getById(this.idGroup[0]);
        	var arrowRo = _drawBoard.getById(this.idGroup[1]);
        	var startNodeRo = ShareObj.vpageList[this.startVPageId];

			ThisLine.rmOldLineNodeInVPages(this.startVPageId, this.stopVPageId);
			lineRo.remove();
			arrowRo.remove();

			VPageEvent.stopDragAndDrawLine(startNodeRo, this, true, ConnectLine);
		});


        this.uuid = startNodeRo.uuid + endNodeRo.uuid;
	};

	ConnectLine.prototype.rmOldLineNodeInVPages = function(startVPageId, stopVPageId){
		var oldLineUUID = startVPageId + stopVPageId;
		var StartVPage = ShareObj.vpageList[startVPageId];
		var EndVPage = ShareObj.vpageList[stopVPageId];

		delete(StartVPage.connectLines[oldLineUUID]);
		delete(EndVPage.connectLines[oldLineUUID]);

		ShareObj.mouseLine.startNodeRo = StartVPage;
	};

	 ConnectLine.prototype.getTrianglePath = function(fx,fy,tx,ty){
		var path = new Array();
		var h = this.TriH;
		var w = this.TriH;
		var a = tx - fx;
		var b = ty - fy;
		var l = Math.sqrt(a*a + b*b);
		var point = {};
		point.x = a - a*h/l + fx;
		point.y = b - b*h/l + fy;
		var t = Math.sqrt(3) /3 * h * b /l;
		var m = Math.sqrt(3) /3 * h * a /l;
		var point1 = {};
		point1.x = point.x +  t;
		point1.y = point.y - m;
		var point2 = {};
		point2.x = point.x - t;
		point2.y =  point.y + m;
		path.push("M");
		path.push(point1.x);
		path.push(" ");
		path.push(point1.y);
		path.push(" L ");
		path.push(tx);
		path.push(" ");
		path.push(ty);
		path.push(" L ");
		path.push(point2.x);
		path.push(" ");
		path.push(point2.y);
		path.push(" Z");
		return path.join("");
	}

	ConnectLine.prototype.getLinePath = function(startRectRo, endRectRo){
		var bb1 = startRectRo.getBBox(),
        bb2 = endRectRo.getBBox(),
        p = [{x: bb1.x + bb1.width / 2, y: bb1.y - 1},
        {x: bb1.x + bb1.width / 2, y: bb1.y + bb1.height + 1},
        {x: bb1.x - 1, y: bb1.y + bb1.height / 2},
        {x: bb1.x + bb1.width + 1, y: bb1.y + bb1.height / 2},
        {x: bb2.x + bb2.width / 2, y: bb2.y - 1},
        {x: bb2.x + bb2.width / 2, y: bb2.y + bb2.height + 1},
        {x: bb2.x - 1, y: bb2.y + bb2.height / 2},
        {x: bb2.x + bb2.width + 1, y: bb2.y + bb2.height / 2}],
        d = {}, dis = [];

	    for (var i = 0; i < 4; i++) {
	        for (var j = 4; j < 8; j++) {
	            var dx = Math.abs(p[i].x - p[j].x),
	                dy = Math.abs(p[i].y - p[j].y);
	            if ((i == j - 4) || (((i != 3 && j != 6) || p[i].x < p[j].x) && ((i != 2 && j != 7) || p[i].x > p[j].x) && ((i != 0 && j != 5) || p[i].y > p[j].y) && ((i != 1 && j != 4) || p[i].y < p[j].y))) {
	                dis.push(dx + dy);
	                d[dis[dis.length - 1]] = [i, j];
	            }
	        }
	    }
	    if (dis.length == 0) {
	        var res = [0, 4];
	    } else {
	        res = d[Math.min.apply(Math, dis)];
	    }
	    var x1 = p[res[0]].x,
	        y1 = p[res[0]].y,
	        x4 = p[res[1]].x,
	        y4 = p[res[1]].y;
	    dx = Math.max(Math.abs(x1 - x4) / 2, 10);
	    dy = Math.max(Math.abs(y1 - y4) / 2, 10);
	    var x2 = [x1, x1, x1 - dx, x1 + dx][res[0]].toFixed(3),
	        y2 = [y1 - dy, y1 + dy, y1, y1][res[0]].toFixed(3),
	        x3 = [0, 0, 0, 0, x4, x4, x4 - dx, x4 + dx][res[1]].toFixed(3),
	        y3 = [0, 0, 0, 0, y1 + dy, y1 - dy, y4, y4][res[1]].toFixed(3);
	    var pathArr = ["M", x1.toFixed(3), y1.toFixed(3), "C", x2, y2, x3, y3, x4.toFixed(3), y4.toFixed(3)];
		return pathArr;
	};

	ConnectLine.prototype.reSetLine = function(){
		var _path = this.getLinePath(this.line.from, this.line.to);
		var _pathLine = _path.join(",");

		var _pathLen = _path.length;
		var _fx = _path[_pathLen-4] -this.TriH;
		var _fy = _path[_pathLen-5] -this.TriH;
		var _tx = _path[_pathLen-2];
		var _ty = _path[_pathLen-1];
		var _pathTri = this.getTrianglePath(_fx, _fy , _tx, _ty);


		this.line.bg && this.line.bg.attr({path: _pathLine});
	    this.line.line[0].attr({path: _pathLine});
	    this.line.line[1].attr({path: _pathTri});
	};

	return ConnectLine;
});