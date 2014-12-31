//Require endpoints from folders
var express = require('express');
var mobileRouter = express.Router();

var fakeData = [
  {
    'eventName':'sampleEvent',
    'regions':[{
      'regionName':'sampleRegion1',
      'regionId': '1',
      'coordinates':[
        [37.789174,-122.419292],
        [37.783510,-122.417961],
        [37.785901,-122.411334],
        [37.791052,-122.414916]
      ]
    },
    {
      'regionName':'sampleRegion2',
      'regionId': '2',
      'coordinates':[
        [37.791052,-122.414916],
        [37.785901,-122.411334],
        [37.787050, -122.409188],
        [37.791646,-122.408154]
      ]
    },
    {
      'regionName':'sampleRegion3',
      'regionId': '3',
      'coordinates':[
        [37.791646,-122.408154],
        [37.787050, -122.409188],
        [37.785505,-122.405334],
        [37.789435,-122.402154]
      ]
    },
    {
      'regionName':'sampleRegion4',
      'regionId': '4',
      'coordinates':[
        [37.783510,-122.417961],
        [37.780220,-122.415816],
        [37.782291,-122.408976],
        [37.785901,-122.411334]
      ]
    },
    {
      'regionName':'sampleRegion5',
      'regionId': '5',
      'coordinates':[
        [37.787050,-122.409188],
        [37.785901,-122.411334],
        [37.782291,-122.408976],
        [37.785505,-122.405334]
      ]
    }]
  }
];

var getEvents = function(req, res) {
  res.json(fakeData);
};

var getActions = function(req, res) {
  var regionId = req.params.regionId;

  //send over dummy data for now
  var message = 
    regionId === '1' ? ['imma action!'] : 
    regionId === '2' ? ['imma action too'] :
    regionId === '3' ? ['imma action three!'] :
    regionId === '4' ? ['dont forget me!'] : ['im alive!'];

  res.send([message]);
};

//mobile routes
mobileRouter.get('/events', getEvents);
mobileRouter.get('/actions/:regionId', getActions);

module.exports = mobileRouter;
