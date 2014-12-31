var express = require('express');
var routeHandler = express.Router();

var mobileRouter = require('./routes/mobile/mobileRouter');
// var webAPIRouter = require('./routes/web/webAPIRouter');
// var webRouter = require('./routes/web/webRouter');

routeHandler.use('/api/mobile', mobileRouter);
// routeHandler.use('/api/web', webAPIRouter);
// routeHandler.use('*', webRouter);



//Serve static files
//router.use(express.static(path.resolve(__dirname + '/client')));

module.exports = routeHandler;
