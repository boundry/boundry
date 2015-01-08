var request = require('supertest');
var app = require('./../../server/server.js');
var assert = require('chai').assert;

var models = require('./../../server/db/db').models;
var collections = require('./../../server/db/db').collections;
var webApiRouter = require('./../../server/routes/web/webApiRouter');
var mobileApiRouter = require('./../../server/routes/mobile/mobileApiRouter');
var authRouter = require('./../../server/routes/web/authRouter');

// var dbConfig; 

// //If LOCAL_DB_TESTING is set, use a local db called 'boundrydb_test'. Otherwise
// //use the staging database on Heroku. This is for DB testing in CircleCI.
// if (process.env.LOCAL_DB_TESTING) {
//   dbConfig = require('./../../knexfile').development;
// } else {
//   dbConfig = require('./../../knexfile').staging;
// }


// var knex = require('knex')(dbConfig.database);  
// console.log("CONNECTING TO DB: ", dbConfig.database.connection);

var testEventNoId = {
  'eventName':'musicFestival',
  'event_id': null,
  'start_time': '2004-05-23T14:25:10',
  'end_time': '15-01-06',
  'regions':
  [  
     {  
        'region_name':'regName1',
        'region_id':null,
        'region_attr':{  
           'coordinates':[  
              {  
                 'latitude':37.8031975582087,
                 'longitude':-122.41825103759766
              },
              {  
                 'latitude':37.80211248443386,
                 'longitude':-122.41026878356934
              },
              {  
                 'latitude':37.79709381086916,
                 'longitude':-122.41498947143555
              }
           ],
           'fill':{  
              'color':'#DDA078 ',
              'opacity':0.3
           },
           'stroke':{  
              'color':'#DDA078 ',
              'weight':3,
              'opacity':0.3
           }
        },
        'actions':[  

        ]
     },
     {  
        'region_name':'regName2',
        'region_id':null,
        'region_attr':{  
           'coordinates':[  
              {  
                 'latitude':37.79024344937056,
                 'longitude':-122.42571830749512
              },
              {  
                 'latitude':37.78997213484954,
                 'longitude':-122.41936683654785
              },
              {  
                 'latitude':37.78434213374121,
                 'longitude':-122.42168426513672
              }
           ],
           'fill':{  
              'color':'#40E989 ',
              'opacity':0.3
           },
           'stroke':{  
              'color':'#40E989 ',
              'weight':3,
              'opacity':0.3
           }
        },
        'actions':[  

        ]
     }
  ]
};

var testEventWithId = {
  'eventName':'musicFest2',
  'event_id': 3,
  'start_time': '2004-05-23T14:25:10',
  'end_time': '15-01-06',
  'regions':
  [  
     {  
        'region_name':'regName1',
        'region_id':null,
        'region_attr':{  
           'coordinates':[  
              {  
                 'latitude':37.8031975582087,
                 'longitude':-122.41825103759766
              },
              {  
                 'latitude':37.80211248443386,
                 'longitude':-122.41026878356934
              },
              {  
                 'latitude':37.79709381086916,
                 'longitude':-122.41498947143555
              }
           ],
           'fill':{  
              'color':'#DDA078 ',
              'opacity':0.3
           },
           'stroke':{  
              'color':'#DDA078 ',
              'weight':3,
              'opacity':0.3
           }
        },
        'actions':[  

        ]
     },
     {  
        'region_name':'regName2',
        'region_id':null,
        'region_attr':{  
           'coordinates':[  
              {  
                 'latitude':37.79024344937056,
                 'longitude':-122.42571830749512
              },
              {  
                 'latitude':37.78997213484954,
                 'longitude':-122.41936683654785
              },
              {  
                 'latitude':37.78434213374121,
                 'longitude':-122.42168426513672
              }
           ],
           'fill':{  
              'color':'#40E989 ',
              'opacity':0.3
           },
           'stroke':{  
              'color':'#40E989 ',
              'weight':3,
              'opacity':0.3
           }
        },
        'actions':[  

        ]
     }
  ]
};

describe('webApiRouter Integration Tests', function() {

  // this.timeout(10000); //10 sec timeout

  //Drop all tables and remake them
  // before(function(done) {
  //   return knex.migrate.rollback(dbConfig)
  //   .then(function() {
  //     return knex.migrate.latest(dbConfig);
  //   })
  //   .then(function() {
  //     done();
  //   })
  // });

  describe('API', function() {

    it('should return array of all events when GET /api/web/organizer/events', function(done) {
      request(app)
        .get('/api/web/organizer/test@org.com/events')
        .set('Cookie', ['email=test@org.com'])
        .end(function(err, res) {
          var events = res.body;
          assert.isObject(events[0]);
          assert.isObject(events[1]);
          done();
        });
    });

    it('should save NEW event to event and region tables when POST /api/web/organizer/events', function(done) {
      request(app)
        .post('/api/web/organizer/test@org.com/events')
        .send(testEventNoId)
        .set('Cookie', ['email=test%40org.com'])
        .end(function(err, res) {
          console.log(res.request._data.eventName);
          assert.equal(res.request._data.eventName, 'musicFestival', 'should be same');
          done();
        });
    });




    it('should update event to event and region tables when POST /api/web/organizer/events', function(done) {
      request(app)
        .post('/api/web/organizer/test%40org.com/events')
        .send(testEventWithId)
        .set('Cookie', ['email=test@org.com'])
        .end(function(err, res) {
          console.log(res.request._data.eventName);
          assert.equal(res.request._data.eventName, 'musicFest2', 'should be same');
          done();
        });
    });

    it('should not be able to POST to /api/web/organizer/events when not logged in', function(done) {
      request(app)
        .post('/api/web/organizer/test@org.com/events')
        .send(testEventWithId)
        .expect(400, done);
    });

    // works on npm run ltest but not npm test
    // it('should GET /organizer/:email/:event_id/regions with right info', function(done) {
    //   request(app)
    //     .get('/api/web/organizer/test@org.com/3/regions')
    //     .set('Cookie', ['email=test%40org.com'])
    //     .end(function(err, res) {
    //       console.log(res);
    //       assert.equal(res.body[0].id, 3, 'should be same');
    //       done();
    //   });
    //     // .expect(400, done);
    // });

  });

});