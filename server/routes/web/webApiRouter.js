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
        if (eventId !== null) {
          collections.Events.query()
          .where({organizer_id:found.attributes.id, id: eventId})
          .update({name:eventName})
          // .save(data)
          .then(function(orgEvent) {
            res.status(300).send('updated');
          });
        } else {
          //save new event to event table
          new models.Event({
            name: eventName,
            start_time: startTime,
            end_time: startTime,
            organizer_id: found.attributes.id
          }).save()
          .then(function(savedEvent) {
            res.status(200).send('created event');
          })
          .catch(function(err) {
            console.log('error:', err);
          }); 
        }
      }
      //get event_id for region just saved and store region data to table
      collections.Events.query()
      .where({organizer_id:found.attributes.id, name:eventName})
      .then(function(foundEv) {
        if (foundEv.length > 0) {
          var evId = foundEv[0].id;
          //save to region table region attr
          regions.forEach(function(region) {
            new models.Region({
              region_name: region.region_name,
              region_attr: JSON.stringify(region.region_attr),
              event_id: evId
            }).save()
            .then(function(savedReg) {
              res.status(200).send('saved a region');
            })
            .catch(function(err) {
              console.log('reg saving err: ' + err);
            });
          });
        }
      });
    });
  } else {
    res.status(400).send('not logged in. cannot post.');
  }
};

var getRegions = function(req,res) {
  if (util.isLoggedIn(req,res)) {
    var orgEmail = req.params.email;
    var eventId = req.params.event_id;
    console.log('in get regions', orgEmail, eventId);
    new models.Organizer({email: orgEmail}).fetchAll().then(function(found) {
      if (found) {
        collections.Regions.query()//({where: {id: eventId}}).fetch()
        .where({id: eventId})
        .then(function(allRegions) {
          // console.log('evev', eventId);
          // console.log('HERE',allRegions);
          res.status(200).send(allRegions);
        })
        .catch(function(err) {
          console.log('getreg err', err);
        });
      }
    });
  } else {
    res.status(400).send('not authorized to get regions');
  }
};


webApiRouter.get('/organizer/:email/events', getEvents);
webApiRouter.post('/organizer/:email/events', postEvent);
webApiRouter.get('/organizer/:email/:event_id/regions', getRegions);


//endpt for actions
//check if region has id
//given eventid -> get regions


module.exports = webApiRouter;
