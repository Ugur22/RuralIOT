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
let lcd;


// Set the port number
let port = 8000;


app.use(express.static(__dirname + '/public'));



// board.on
board.on("ready", function () {

  lcd = new five.LCD({
    // LCD pin name  RS  EN  DB4 DB5 DB6 DB7
    // Arduino pin # 7    8   9   10  11  12
    pins: [7, 8, 9, 10, 11, 12],
    backlight: 6,
    rows: 2,
    cols: 20

  });

  // Connection message in the console
  console.log('ARDUINO BOARD READY STATE: TRUE');
  var led = new five.Led(13);
  this.repl.inject({
    led: led
  });

  led.blink(1000);
  let sensor = new five.Sensor("A1");
  var phvalue;

  sensor.scale([0, 100]).on('change', function () {
    phvalue = Math.floor(this.scaled);
    io.emit('data', Math.floor(this.scaled));
    lcd.print("PHvalue: " + phvalue);
    lcd.cursor(0, 0);
  });



});

const server = http.createServer(app).listen(port, function (req, res) {
  console.log('LISTENING ON PORT ' + port);
});



// Set up socket.io to 'listen'
io = io.listen(server);

// Display a conection message
io.on('connection', function (socket) {
  console.log('SOCKET.IO CONNECTED');

  // Display a disconnection message
  socket.on('disconnect', function () {
    console.log('SOCKET.IO DISCONNECTED');
  })
});