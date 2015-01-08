//Require endpoints from folders
var express = require('express');
var webApiRouter = express.Router();
var models = require('../../db/db').models;
var collections = require('../../db/db').collections;
var util = require('./../../../lib/utility');

//should pull events and their regions
var getEvents = function(req,res) {
  if (true) {
  //if (util.isLoggedIn(req,res)) {
    var orgEmail = req.params.email;
    new models.Organizer({email: orgEmail}).fetch().then(function(found) {
      if (found) {
        var finalObj = [];
             new collections.Events({'organizer_id': found.attributes.id})
             .fetch({withRelated: ['regions']})
             .then(function(orgEvents) {
               orgEvents.models.forEach(function(orgEv) {
                orgEv.attributes.regions = [];

                //for every region, push region attr to event.regions
                  orgEv.relations.regions.models.forEach(function(reg) {
                    orgEv.attributes.regions.push(reg.attributes);
                  });
               });
                 res.status(200).send(orgEvents.models);
             });
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
    var regions = req.body.regions;
    var eventId = req.body.event_id;

    new models.Organizer({email: orgEmail}).fetch().then(function(found) {
      if (found) {
        //existing event
        if (eventId !== null) {
          collections.Events.query()
          .where({organizer_id:found.attributes.id, id: eventId})
          .update({name:eventName})
          .then(function(orgEvent) {
            regions.forEach(function(region) {
              //existing region
              if (region.region_id) {
                collections.Regions.query()
                .where({ event_id: eventId,id: region.region_id})
                .update({region_name:region.region_name, region_attr: JSON.stringify(region.region_attr)
                })
                .then(function(reg) {
                  console.log('updatedReg!');
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
                  console.log('af',region);
                    new models.Region({
                      region_name: region.region_name,
                      region_attr: JSON.stringify(region.region_attr),
                      event_id: evId
                    }).save()
                    .then(function(savedReg) {
                      // console.log('savedreg', savedReg);
                      res.status(200).send('saved ev and region');
                    })
                    .catch(function(err) {
                      throw(err);
                    });
                });
              }
            });
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
