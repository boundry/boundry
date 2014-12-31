//Require endpoints from folders
var express = require('express');
var webRouter = express.Router();

// var webRouter = function(req, res) {
//   res.send(200);
// };


var getEvents = function(req,res) {
  res.json([{
    'regions':[{
      'regionName':'sampleRegion1',
      'regionId': '1',
      'coordinates':[
        [37.789174,-122.419292],
        [37.783510,-122.417961],
        [37.785901,-122.411334],
        [37.791052,-122.414916]
      ]
    }]
  }]);
};

//save event
var postEvent = function(req,res) {
  //req.body contains event to be saved
  console.log(req.body);
  res.json(req.body);
};


// webRouter.get('/login', checkLogin);
// webRouter.get('/signup', checkSignup)

webRouter.get('/organizer/:id/events', getEvents);
webRouter.post('/organizer/:id/events', postEvent);


module.exports = webRouter;
