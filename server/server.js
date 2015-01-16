var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var path = require('path');

var routeHandler = require('./routeHandler');

var app = express();

//Define middleware
app.use(session({
  secret: 'keyboard cat',
   resave: false,
   saveUninitialized: true
   }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(morgan('tiny'));
console.log(path.join(__dirname, '/../client'));
app.use(express.static(path.join(__dirname, '/../client/')));

//Application
var port = process.env.PORT || 8000;
console.log('Server listening on ' + port);

app.use(routeHandler).listen(port);

module.exports = app;
