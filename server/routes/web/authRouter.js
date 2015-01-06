var express = require('express');
var authRouter = express.Router();
var models = require('../../db/db').models;
var util = require('./../../../lib/utility');

authRouter.checkLogin = function(req,res) {
  var email = req.body.email;
  var password = req.body.password;
  new models.Organizer({email: email}).fetch().then(
    function(org) {
      if (!org) {
        //redirect to login
        res.sendStatus(400, 'duplicate email');
      } else {
        org.checkPassword(password)
        .then(function(isMatch) {
          if (isMatch) {
            util.createSession(req,res,org);
          } else {
            res.sendStatus(400, 'unmatched password');
          }
        })
        .catch(function(err) {
        });
      }
  });
};

authRouter.checkSignup = function(req,res) {
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  var newOrg;
  new models.Organizer({email: email}).fetch().then(
    function(org) {
      if (!org) {
        newOrg = new models.Organizer({
          name:name,
          email:email,
          password: password
        });
        newOrg.save().then(function(savedOrg) {
        res.sendStatus(200,'created organizer');
        });
      } else {
        res.sendStatus(400,'cannot create organizer');
      }
  });
};

authRouter.checkLogout = function(req,res) {
  console.log('in checklogout',req.cookies);
  // req.session.cookie.user = 'testUser';
  if (req.cookies.user) {
    util.destroySession(req,res);
  } else {
    res.sendStatus(400,'no one to log out');
  }
};

module.exports = authRouter;






