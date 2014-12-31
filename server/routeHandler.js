var express = require('express');
var routeHandler = express.Router();
var path = require('path');

var mobileApiRouter = require('./routes/mobile/mobileApiRouter');
// var webAPIRouter = require('./routes/web/webAPIRouter');
// var webRouter = require('./routes/web/webRouter');

routeHandler.use('/api/mobile', mobileApiRouter);
// routeHandler.use('/api/web', webAPIRouter);
// routeHandler.use('*', webRouter);



//serve signup page as default
routeHandler.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname + '/../client/signup.html'));
});

//serve all static files
routeHandler.use(express.static(__dirname + './../client'));


module.exports = routeHandler;
