//Require endpoints from folders
var express = require('express');
var webApiRouter = express.Router();
var models = require('../../db/db').models;
var collections = require('../../db/db').collections;
var util = require('./../../../lib/utility');

var getEvents = function(req,res) {
  if (util.isLoggedIn(req,res)) {
    var orgEmail = req.params.email;
    new models.Organizer({email: orgEmail}).fetch().then(function(found) {
      if (found) {
        collections.Events.query().where({organizer_id:found.attributes.id})
        .then(function(orgEvents) {
          res.status(200).send(orgEvents);
        });
      }
    });
  } else {
    res.status(400).send('not logged in. cannot get.');
  }
};

//should save to the events table and regions table
var postEvent = function(req,res) {
  if (util.isLoggedIn(req,res)) {
    var orgEmail = req.params.email;
    //create object to save
    var eventName = req.body.eventName;
    var startTime = req.body.start_time;
    var regions = req.body.regions;
    var eventId = req.body.event_id;

    new models.Organizer({email: orgEmail}).fetch().then(function(found) {
      if (found) {
        //existing event
          console.log('old found', eventName);

        if (eventId !== null) {
          collections.Events.query()
          .where({organizer_id:found.attributes.id, id: eventId})
          .update({name:eventName})
          // .save(data)
          .then(function(orgEvent) {
            console.log('asdf',orgEvent);  
            res.status(300).send('updated');

          });

        } else {
          //new event
          new models.Event({
            name: eventName,
            start_time: startTime,
            end_time: startTime,
            organizer_id: found.attributes.id
          }).save()
          .then(function(savedEvent) {
            console.log('saving event!!');
            res.status(200).send('created event');
          })
          .catch(function(err) {
            console.log('error:', err);
          });
        }
      }
    });
  } else {
    res.status(400).send('not logged in. cannot post.');
  }
};

webApiRouter.get('/organizer/:email/events', getEvents);
webApiRouter.post('/organizer/:email/events', postEvent);

//endpt for actions
//check if region has id

// webApiRouter.get('/organizer/:id/regions', getRegions);

//given eventid -> get regions

module.exports = webApiRouter;
