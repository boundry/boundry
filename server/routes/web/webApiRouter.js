//Require endpoints from folders
var express = require('express');
var webApiRouter = express.Router();
var models = require('../../db/db').models;
var collections = require('../../db/db').collections;

var getEvents = function(req,res) {
  var orgName = req.params.name;
  new models.Organizer({name: orgName}).fetch().then(function(found) {
    if (found) {
      collections.Events.query().where({organizer_id:found.attributes.id}).fetch()
      .then(function(orgEvents) {
        console.log('found orgEvents', orgEvents);
        res.send(200, orgEvents);
      });
    }
  });

  // res.json([{
  //   'regions':[{
  //     'regionName':'sampleRegion1',
  //     'regionId': '1',
  //     'coordinates':[
  //       [37.789174,-122.419292],
  //       [37.783510,-122.417961],
  //       [37.785901,-122.411334],
  //       [37.791052,-122.414916]
  //     ]
  //   }]
  // }]);
};

//save event
var postEvent = function(req,res) {
  var orgId = req.params.id;

  //req.body contains event to be saved
  console.log(req.body);
  res.json(req.body);
};

webApiRouter.get('/organizer/:name/events', getEvents);
webApiRouter.post('/organizer/:name/events', postEvent);


module.exports = webApiRouter;
