//Require endpoints from folders
var express = require('express');
var mobileApiRouter = express.Router();
var models = require('../../db/db').models;
var collections = require('../../db/db').collections;

var getEvents = function(req, res) {
  new collections.Events()
  .fetch({withRelated: ['regions']})
  .then(function(orgEvents) {
    console.log(orgEvents.models);
    orgEvents.models.forEach(function(orgEv) {
     // orgEv.attributes.regions = [];
     // //for every region, push region attr to event.regions
     //   orgEv.relations.regions.models.forEach(function(reg) {
     //     orgEv.attributes.regions.push(reg.attributes);
     //   });

     orgEv.attributes.event_center = JSON.parse(orgEv.attributes.event_center);
     console.log('attr!!',orgEv.attributes.event_center);
     orgEv.attributes.regions = [];
     //for every region, push region attr to event.regions
     orgEv.relations.regions.models.forEach(function(reg) {
       //We stringify this field on saving, so we have to parse it out here
       reg.attributes.region_attr = JSON.parse(reg.attributes.region_attr);                     
       //ev.attributes.regions.push(reg.attributes);
     });

       
    });
    console.log('qqwer');
      res.status(200).send(orgEvents.models);
  })
  .catch(function(err) {
    res.status(400).send('cannot get orgEvents');
  });
};

var getActions = function(req, res) {
  var regId = req.params.regionId;
  console.log(regId);
  collections.Actions.query().where({region_id: regId})
  .then(function(allActions) {
    if (allActions.length > 0) {
      res.status(200).send(allActions);
    } else {
      res.status(400).send('no actions');
    }
  })
  .catch(function(err) {
    res.status(400).send(err);
  });
};

//mobile routes
mobileApiRouter.get('/events', getEvents);
mobileApiRouter.get('/actions/:regionId', getActions);

module.exports = mobileApiRouter;

