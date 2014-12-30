//Require endpoints from folders
var express = require('express');
var mobileRouter = express.Router();

var getEvents = function(req, res) {
  res.json([
    {
      'eventName':'sampleEvent',
      'regions':[{
        'regionName':'sampleRegion1',
        'coordinates':[
          [37.789174,-122.419292],
          [37.783510,-122.417961],
          [37.785901,-122.411334],
          [37.791052,-122.414916]
        ]
      },
      {
        'regionName':'sampleRegion2',
        'coordinates':[
          [37.791052,-122.414916],
          [37.785901,-122.411334],
          [37.787050, -122.409188],
          [37.791646,-122.408154]
        ]
      },
      {
        'regionName':'sampleRegion3',
        'coordinates':[
          [37.791646,-122.408154],
          [37.787050, -122.409188],
          [37.785505,-122.405334],
          [37.789435,-122.402154]
        ]
      },
      {
        'regionName':'sampleRegion4',
        'coordinates':[
          [37.783510,-122.417961],
          [37.780220,-122.415816],
          [37.782291,-122.408976],
          [37.785901,-122.411334]
        ]
      },
      {
        'regionName':'sampleRegion5',
        'coordinates':[
          [37.787050,-122.409188],
          [37.785901,-122.411334],
          [37.782291,-122.408976],
          [37.785505,-122.405334]
        ]
      }]
    }
  ]);
};

//mobile routes
mobileRouter.get('/events', getEvents);

module.exports = mobileRouter;
