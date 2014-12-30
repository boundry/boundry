var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors');

var routeHandler = require('./routeHandler')

var app = express();

//Define middleware
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

//Application
var port = process.env.PORT || 8000;
console.log('Server listening on ' + port);

app.use(routeHandler).listen(port);

module.exports = app;
