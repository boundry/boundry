var express = require('express');
var session = require('express-session');
// var app = express();
/**
  redirect and user sessions
*/

//creates a new session
exports.createSession = function(req,res,newUser) {
  return req.session.regenerate(function(err) {
    if (!err) {
      // req.session.user = newUser;
      res.cookie('user','cookie!');
      res.sendStatus(200,'created session');
    } else {
      res.sendStatus(400,err);
    }
  });
};

//destroys a session
exports.destroySession = function(req,res) {
  console.log('in destroy');
    req.session.destroy(function(err) {
      if (err) {
        console.log(err);
        res.sendStatus(400,err);
      } else {
        console.log('in here');
        res.sendStatus(200,'logout successful');
      }
      });
};
//returns boolean of whether user is logged in or not
exports.isLoggedIn = function(req,res) {
  return req.session ? !!req.session.user : false;
};

exports.checkUser = function(req,res,next) {
  if (!exports.isLoggedIn(req)) {
    res.sendStatus(400, 'no one to logout');
  } else {
    next();
  }
};