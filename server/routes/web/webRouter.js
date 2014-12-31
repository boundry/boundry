//Require endpoints from folders
var express = require('express');
var webRouter = express.Router();
var authRouter = require('./authRouter.js');

var webRouter = function(req, res) {
  res.send(200);
};

webRouter.get('/', function(req,res) {
  res.render('index');
});

webRouter.get('/signup', function(req,res) {
  res.render('signup');
});
webRouter.post('/signup', authRouter.checkSignup)

webRouter.get('/login', function(req,res) {
  res.render('login');
});
webRouter.post('/login', authRouter.checkLogin);

module.exports = webRouter;
