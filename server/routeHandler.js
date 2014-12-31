var express = require('express');
var routeHandler = express.Router();
var path = require('path');

var mobileRouter = require('./routes/mobile/mobileRouter');
var webApiRouter = require('./routes/web/webApiRouter');
var webRouter = require('./routes/web/webRouter');

routeHandler.use('/api/mobile', mobileRouter);
routeHandler.use('/api/web', webAPIRouter);
routeHandler.use('*', webRouter);

//serve signup page as default
routeHandler.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname + '/../client/signup.html'));
});

//serve all static files
routeHandler.use(express.static(__dirname + './../client'));

module.exports = routeHandler;
