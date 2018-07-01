// Global variables
let http = require('http');
let express = require('express');
const ejs = require("ejs").__express;
let path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
// Create app instance
let app = new express();
const config = require('./webpack.config.js');
const compiler = webpack(config);


// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));