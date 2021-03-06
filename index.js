
var express = require('express')
  , http = require('http');


var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);
var five = require("johnny-five"),
  // or "./lib/johnny-five" when running from the source
  board = new five.Board();
var door_closed = "";
board.on("ready", function () {

  // Create an Led on pin 13 and strobe it on/off
  // Optionally set the speed; defaults to 100ms
  //  this.pinMode(7,five.Pin.INPUT);
  //  
  //  this.digitalRead(7, function(value) {
  //    console.log(value);
  //  });




  button = new five.Button({
	pin:2,
	isPullup:true	
  });
  board.repl.inject({
    button: button
  });

  button.on("down", function () {
    // io.emit('message', 'door_opened');
    io.emit('message', 'ring_touch');
    console.log("down");
    door_closed = "opened";
  });

  // "hold" the button is pressed for specified time.
  //        defaults to 500ms (1/2 second)
  //        set
  button.on("hold", function () {
     io.emit('message', 'ring_placed');
    console.log("hold");
  });

  // "up" the button is released
  button.on("up", function () {
    // door_closed = "closed";
    // io.emit('message', 'door_closed');
    io.emit('message', 'ring_detouched');
    console.log("up");
  });
});
app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/compiled'));




server.listen(8001);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
app.get('/clockControl.html', function (req, res) {
  res.sendFile(__dirname + '/clockControl.html');
});
app.get('/controlAlpha.html', function (req, res) {
  res.sendFile(__dirname + '/controlAlpha.html');
});


io.on('connection', function (socket) {
  // socket.emit('news', door_closed);
  // socket.on('message', function (data) {
  //   io.emit('message', data);
  //   console.log(data);
  // });
  // socket.on('chat', function (data) {
  //   io.emit('chat', data);
  //   console.log(data);
  // });


});
