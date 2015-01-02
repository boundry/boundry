var request = require('supertest');
var app = require('./../../server/server.js');
var assert = require('chai').assert;

var models = require('./../../server/db/db').models;
var collections = require('./../../server/db/db').collections;

var dbConfig; 

//If LOCAL_DB_TESTING is set, use a local db called 'boundrydb_test'. Otherwise
//use the staging database on Heroku. This is for DB testing in CircleCI.
if (process.env.LOCAL_DB_TESTING) {
  dbConfig = require('./../../knexfile').development;
} else {
  dbConfig = require('./../../knexfile').staging;
}

describe('Server Integration Tests', function() {

  describe('API', function() {

    it('should return array of all events when queried at /api/mobile/events', function(done) {
      request(app)
        .get('/api/mobile/events')
        .end(function(err, res) {
          var events = res.body;

          assert.isArray(events);

          assert.isObject(events[0]);
          assert.isArray(events[0].regions);
          assert.isString(events[0].eventName);

          done();
        });
    });
  });

  describe('Auth', function() {
    
  });
});

var knex = require('knex')(dbConfig.database);  
console.log("CONNECTING TO DB: ", dbConfig.database.connection);

describe('Database Unit Tests', function () {
  this.timeout(10000); //10 sec timeout

  //Drop all tables and remake them
  before(function(done) {
    return knex.migrate.rollback(dbConfig)
    .then(function() {
      return knex.migrate.latest(dbConfig);
    })
    .then(function() {
      done();
    })
  });

  //Save a new organizer
  it('should save a new organizer', function (done) {
    //Save a new organizer model
    new models.Organizer({
      name: 'Test org',
      email: 'test@org.com',
      password: 'testpass'
    })
    .save()

    .then(function(model) {
      new models.Organizer({ name: 'Test org' })
        .fetch()
        .then(function( model ) {
          //Assert that it fetches properly
          assert.equal(model.get('name'), 'Test org', 'should be same');
          done();
        }).catch(function (err) {
          done(err);
        });
    });
  })

  //Below tests are not finished yet; they should be linked to the above
  //organizer
  //Create a new event
  it('should save a new event for that organizer', function (done) {
    //Save a new Event model
    new models.Event({
      name: 'My Event',
      start_time: '2004-05-23T14:25:10',
      end_time: '2004-05-23T14:25:10'
    }).save()

    .then(function(model) {
      new models.Event({ name: 'My Event' })
        .fetch()
        .then(function( model ) {
          //Assert that it fetches properly
          assert.equal(model.get('name'), 'My Event', 'should be same');
          done();
        }).catch(function (err) {
          done(err);
        });
    })
  })

  //Create a new region
  it('should save a new region for that organizer', function (done) {
    //Save a new region model
    new models.Region({
      name: 'My Region',
      coordinates: 'test coordinates'
    }).save()

    .then(function(model) {
      new models.Region({ name: 'My Region' })
        .fetch()
        .then(function( model ) {
          //Assert that it fetches properly
          assert.equal(model.get('name'), 'My Region', 'should be same');
          done();
        }).catch(function (err) {
          done(err);
        });
    })
  })
});
