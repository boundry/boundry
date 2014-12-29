//Require endpoints from folders
var express = require('express');
var mobileRouter = express.Router();

var getEvents = function(req, res) {
  res.json([
    {
      eventName: 'sampleEvent',
      regions: [{
        regionName: 'sampleRegion',
        coordinates: [
          [37.787050, -122.409188],
          [37.785901, -122.411334],
          [37.782291, -122.408976],
          [37.785505, -122.405334]
        ]
      }]
    }
  ]);
}

//mobile routes
mobileRouter.get('/events', getEvents);

module.exports = mobileRouter;
