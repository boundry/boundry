var express = require('express');
var routeHandler = express.Router();
var path = require('path');


var mobileApiRouter = require('./routes/mobile/mobileApiRouter');
var webApiRouter = require('./routes/web/webApiRouter');
var authRouter = require('./routes/web/authRouter');


//serve signup page as default
routeHandler.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname + '/../client/index.html'));
});

//serve all static files
routeHandler.use(express.static(__dirname + './../client'));

routeHandler.use('/api/mobile', mobileApiRouter);
routeHandler.use('/api/web', webApiRouter);

routeHandler.post('/signup', authRouter.checkSignup);
routeHandler.post('/login', authRouter.checkLogin);
routeHandler.get('/logout', authRouter.checkLogout);

module.exports = routeHandler;
