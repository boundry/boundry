//Require endpoints from folders
var express = require('express');
var mobileApiRouter = express.Router();

var fakeData = [
  {
    'eventName':'sampleEvent1',
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
  },
  {
    'eventName':'sampleEvent2',
    'regions':[{
      'regionName':'sampleRegion1',
      'regionId': '1',
      'coordinates':[
        [37.789174,-122.416292],
        [37.783510,-122.414961],
        [37.785901,-122.408334],
        [37.791052,-122.411916]
      ]
    },
    {
      'regionName':'sampleRegion2',
      'regionId': '2',
      'coordinates':[
        [37.791052,-122.411916],
        [37.785901,-122.408334],
        [37.787050, -122.406188],
        [37.791646,-122.405154]
      ]
    },
    {
      'regionName':'sampleRegion3',
      'regionId': '3',
      'coordinates':[
        [37.791646,-122.405154],
        [37.787050, -122.406188],
        [37.785505,-122.402334],
        [37.789435,-122.399154]
      ]
    },
    {
      'regionName':'sampleRegion4',
      'regionId': '4',
      'coordinates':[
        [37.783510,-122.414961],
        [37.780220,-122.412816],
        [37.782291,-122.405976],
        [37.785901,-122.408334]
      ]
    },
    {
      'regionName':'sampleRegion5',
      'regionId': '5',
      'coordinates':[
        [37.787050,-122.406188],
        [37.785901,-122.408334],
        [37.782291,-122.405976],
        [37.785505,-122.402334]
      ]
    }]
  },
  {
    'eventName':'sampleEvent3',
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
    regionId === 'sampleRegion1' ? ['imma action!'] : 
    regionId === 'sampleRegion2' ? ['imma action too'] :
    regionId === 'sampleRegion3' ? ['imma action three!'] :
    regionId === 'sampleRegion4' ? ['dont forget me!'] : ['im alive!'];

  res.send(message);
};

//mobile routes
mobileApiRouter.get('/events', getEvents);
mobileApiRouter.get('/actions/:regionId', getActions);

module.exports = mobileApiRouter;
