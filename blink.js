// Global variables
let http = require('http');
let express = require('express');
let path = require('path');
// Create app instance
let app = new express();


// Set the port number
let port = 8000;


app.use(express.static(__dirname + '/public'));



const server = http.createServer(app).listen(port, function (req, res) {
  console.log('LISTENING ON PORT ' + port);
});
