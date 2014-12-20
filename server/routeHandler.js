var express = require('express');
var routeHandler = express.Router();
var path = require('path');

var mobileRouter = require('./routes/mobile/mobileRouter');
var webRouter = require('./routes/web/webRouter');

routeHandler.use('/api/mobile', mobileRouter);
routeHandler.use('/api/web', webRouter);

//Serve static files
//router.use(express.static(path.resolve(__dirname + '/client')));

module.exports = routeHandler;
