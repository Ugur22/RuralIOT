// Global variables
let http = require('http');
let express = require('express');
let path = require('path');
let io = require('socket.io');
let five = require("johnny-five");

// Create board instance
let board = new five.Board();
// Create app instance
let app = new express();

// Set the port number
let port = 8000;


app.use(express.static(__dirname + '/public'));



// board.on
board.on("ready", function() {
  // Connection message in the console
  console.log('ARDUINO BOARD READY STATE: TRUE');
  var led = new five.Led(13);
  led.blink(500);
  let sensor = new five.Sensor("A1");

  sensor.scale([0, 100]).on('change', function() {
    phvalue = Math.floor(this.scaled);
    io.emit('data', Math.floor(this.scaled) );
  });
});

const server = http.createServer(app).listen(port, function(req, res){
  console.log('LISTENING ON PORT ' + port);
});



// Set up socket.io to 'listen'
io = io.listen(server);

// Display a conection message
io.on('connection', function(socket){
  console.log('SOCKET.IO CONNECTED');

  // Display a disconnection message
  socket.on('disconnect', function(){
    console.log('SOCKET.IO DISCONNECTED');
  })
});