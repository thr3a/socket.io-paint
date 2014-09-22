$(function(){

	var canvas = document.getElementById('mycanvas');
	var context = canvas.getContext('2d');

	context.lineWidth = 3;
	context.lineCap = 'round';
	var penColor = '#'+Math.floor(Math.random()*0xFFFFFF).toString(16);

	var positioning = null;
	var drawing = false;

	canvas.onmousedown = function(event) {
		positioning = getPosition(event);
		drawing = true;
	};
	canvas.onmousemove = function(event) {
		if (drawing == true) {
			drawLine(event);
		}
	};
	canvas.onmouseup = function(event) {
		drawLine(event);
		drawing = false;
	};
	canvas.onmouseover = function(event) {
		drawing = false;
	};

	function drawLine(event) {
		var positions = getPosition(event);
		var points = {
			x: positions.x,
			y: positions.y,
			xp: positioning.x,
			yp: positioning.y,
			color: penColor
		};
		paint.json.emit('paint points', points);
		painting(points);
		positioning = points;
	}

	function painting(points) {
		context.strokeStyle = points.color;
		context.beginPath();
		context.moveTo(points.x, points.y);
		context.lineTo(points.xp, points.yp);
		context.stroke();
		context.closePath();
	}
	//イベント座標を取得
	function getPosition(event){
		//canvas自体の左上座標を取得
		var rect = $(event.target).offset();
		return {x: event.pageX - rect.left, y: event.pageY - rect.top};
	}
	
	var paint = new io.connect();
	paint.on('paint points', function(points) {
		painting(points);
	});
	paint.on('paint clear', function() {
		context.clearRect(0, 0, canvas.width, canvas.height);
	});
});