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
        res.redirect('/login');
      } else {
        console.log('in here check pw');

        org.checkPassword(password)
        .then(function(isMatch) {
          if (isMatch) {
            console.log('password matches');
          //util.createSession(req,res,org);
            res.sendStatus(200);
          } else {
            console.log('not match');
            res.redirect('/login');          
          }
        })
        .catch(function(err) {
          console.log('catch');
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
        // util.createSession(req,res,savedOrg);
        res.sendStatus(200);
        });
      } else {
        console.log('could not sign up');
        res.redirect('/signup');

      }
  });
};

module.exports = authRouter;