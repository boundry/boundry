var express = require('express');
var authRouter = express.Router();
// var models = require('../../db/db');

// authRouter.checkLogin = function(req,res) {
//   var name = req.body.name;
//   var password = req.body.password;
//   new models.Organizer({name: name}).fetch().then(
//     function(org) {
//       if (!org) {
//         //redirect to login
//         res.redirect('/login');
//       } else {
//         org.checkPassword(password, function(match) {
//           if (match) {
//             //create session?
//             //util.createSession(req,res,org);
//           } else {
//             res.redirect('/login');
//           }
//         });
//       }
//   });
// };

// // .....CREATE SESSIONS

// authRouter.checkSignup = function(req,res) {
//   var name = req.body.name;
//   var email = req.body.email;
//   var password = req.body.password;
//   new models.Organizer({name: name}).fetch().then(
//     function(org) {
//       if (!org) {
//         var newOrg = new models.Organizer({
//           name:name,
//           email:email,
//           password: password
//         });
//         newOrg.save().then(function(savedOrg) {
//         //util.createSession(req,res,savedOrg);
//         });
//       } else {
//         console.log('could not sign up')
//         res.redirect('/signup');
//       }
//   });
// };

module.exports = authRouter;