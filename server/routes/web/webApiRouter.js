//Require endpoints from folders
var express = require('express');
var webApiRouter = express.Router();
var models = require('../../db/db').models;
var collections = require('../../db/db').collections;
var util = require('./../../../lib/utility');

//should pull events and their regions for a given org email
var getEvents = function(req,res) {
  if (util.isLoggedIn(req,res)) {
    var orgEmail = req.params.email;
    //Get organizer ID. Inefficient but that's what we're getting from client
    //for now
    new models.Organizer({email: orgEmail}).fetch().then(function(found) {
      if (found) { //Organizer exists
        var finalObj = [];
        collections.Events //Get the Organizer's events
          .query('where', 'organizer_id', '=', found.get('id'))
          .fetch({withRelated: ['regions']})
          .then(function(events) {
            if (events.length !== 0) { //Organizer has events
              events.models.forEach(function(ev) {
                ev.attributes.regions = [];
                //for every region, push region attr to event.regions
                ev.relations.regions.models.forEach(function(reg) {
                  //We stringify this field on saving, so we have to parse it out here
                  reg.attributes.region_attr = JSON.parse(reg.attributes.region_attr);                     
                  //ev.attributes.regions.push(reg.attributes);
                });
              });
            } 
            res.status(200).send(events.models);
          })
        .catch(function(error) {
          res.send(500);
          throw error;
        });
      } else { //Organizer does not exist
        res.status(400).send('Organizer with email ', orgEmail, ' not found');
      }
    });
  } 
  else {
    res.status(400).send('not logged in. cannot get.');
  }
};

//post update
//should save to the events table and regions table
var postEvent = function(req,res) {
 if (util.isLoggedIn(req,res)) {
   var orgEmail = req.params.email;
   //create object to save
   var eventName = req.body.eventName;
   var startTime = req.body.start_time;
   var eventCenter = JSON.stringify(req.body.event_center);
   var regions = req.body.regions;
   var eventId = req.body.event_id;

    new models.Organizer({email: orgEmail}).fetch().then(function(found) {
      if (found) {
        //existing event
        if (eventId !== null) {
          collections.Events.query()
          .where({organizer_id:found.attributes.id, id: eventId})
          .update({name:eventName, event_center: eventCenter})
          .then(function(orgEvent) {
            regions.forEach(function(region) {
              //existing region
              if (region.region_id) {
                collections.Regions.query()
                .where({ event_id: eventId,id: region.region_id})
                .update({region_name:region.region_name, region_attr: JSON.stringify(region.region_attr)
                })
                .then(function(reg) {
                  // res.status(300).send('updated');
                });
              //new region
              } else {
                new models.Region({
                  region_name: region.region_name,
                  region_attr: JSON.stringify(region.region_attr),
                  event_id: eventId
                }).save()
                .then(function(savedReg) {
                  // res.status(200).send('saved ev and region');
                })
                .catch(function(err) {
                  throw(err);
                });

              }
            });
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
            //get event_id for region just saved and store region data to table
            collections.Events.query()
            .where({organizer_id:found.attributes.id, name:eventName})
            .then(function(foundEv) {
              if (foundEv.length > 0) {
                var evId = foundEv[0].id;
                //save to region table region attr
                regions.forEach(function(region) {
                  //check if have regionId (existing)
                    new models.Region({
                      region_name: region.region_name,
                      region_attr: JSON.stringify(region.region_attr),
                      event_id: evId
                    }).save()
                    .then(function(savedReg) {
                    })
                    .catch(function(err) {
                      throw(err);
                    });
                });
              }
            });
          res.status(200).send('saved ev and region');
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


module.exports = webApiRouter;
