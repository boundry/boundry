var request = require('supertest');
var app = require('./../../server/server.js');
var assert = require('chai').assert;

var models = require('./../../server/db/db').models;
var collections = require('./../../server/db/db').collections;
var webApiRouter = require('./../../server/routes/web/webApiRouter');
var mobileApiRouter = require('./../../server/routes/mobile/mobileApiRouter');
var authRouter = require('./../../server/routes/web/authRouter');

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
    .save().then(function(model) {
      new models.Organizer({ name: 'Test org' })
        .fetch()
        .then(function(model) {
          //Assert that it fetches properly
          assert.equal(model.get('name'), 'Test org', 'should be same');
          done();
        }).catch(function (err) {
          done(err);
        });
    });
  });

  //Create a new event
  it('should save a new event for that organizer', function (done) {
    //Save a new Event model
    new models.Event({
      name: 'My Event',
      start_time: '2004-05-23T14:25:10',
      end_time: '2004-05-23T14:25:10',
      organizer_id: 1
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
      });
  });

  it('should save a new region for an event', function (done) {
    //Save a new region model
    new models.Region({
      name: 'My Region',
      coordinates: 'test coordinates',
      event_id: 1
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
  });
  //user is mobile client
  it('should save a new user for an event', function (done) {
    new models.User({
      id: '1'
    }).save(null, {method: 'insert'})
    .then(function(model) {
      new models.User({ id: '1'})
        .fetch()
        .then(function( model ) {
          //Assert that it fetches properly
          assert.equal(model.get('id'), '1', 'should be same');
          done();
        }).catch(function (err) {
          done(err);
        });
    })
  });
  //save action
  it('should save an action for a region', function (done) {
    new models.Action({
      name: 'Sale!',
      action_data: '50% off',
      region_id: 1
    }).save()
    .then(function(model) {
      new models.Action({ name: 'Sale!'})
        .fetch()
        .then(function( model ) {
          //Assert that it fetches properly
          assert.equal(model.get('name'), 'Sale!', 'should be same');
          done();
        }).catch(function (err) {
          done(err);
        });
    })
  });

  //Create a new locationData entry
  it('should save location data from a user', function (done) {
    //Save a new region model
    new models.LocationData({
      latitude: 127.098374,
      longitude: 127.123456
    }).save()

    .then(function(model) {
      new models.LocationData({ latitude: 127.098374 })
        .fetch()
        .then(function( model ) {
          //Assert that it fetches properly
          assert.equal(model.get('latitude'), 127.098374, 'should be same');
          assert.equal(model.get('longitude'), 127.123456, 'should be same');
          done();
        }).catch(function (err) {
          done(err);
        });
    })
  });
  
  it('should signup a new org successfully', function(done) {
    request(app)
      .post('/signup')
      .send({ name: 'testName', email: 'test@gmail.com', password: 'testpw'})
      .expect(200, done);
  });

  it('should return error if attempting to signup with a used email', function(done) {
    request(app)
      .post('/signup')
      .send({ name: 'testName2', email: 'test@gmail.com', password: 'testpw2'})
      .expect(302, done); //302 - redirect to signup
  });
 
  it('should login a new org successfully', function(done) {
    request(app)
      .post('/login')
      .send({ name: 'testName', email: 'test@gmail.com', password: 'testpw'})
      .expect(200, done);
  });

  it('should return error if attempting to login with a wrong password', function(done) {
    request(app)
      .post('/login')
      .send({ name: 'testName', password: 'tpw'})
      .expect(302, done);
  });
});

//get to mobileApiRouter
//post to mobileApiRouter
//get to webApiRouter
//post to webApiRouter
//post to login
//post to signin



