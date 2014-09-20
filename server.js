var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = 3000;

app.use(express.static('public'));

http.listen(port, function(){
	console.log('listening on *: '+ port);
});

var points = [];

paint = io.on('connection', function(socket){
	if (points.length > 0) {
		for (var i in points) {
			socket.json.emit('paint points', points[i]);
		}
	}

	socket.on('paint points', function(data) {
		points.push(data);
		paint.emit('paint points', data);
	});
});
