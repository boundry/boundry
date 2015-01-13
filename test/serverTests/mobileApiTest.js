var request = require('supertest');
var app = require('./../../server/server.js');
var assert = require('chai').assert;

var models = require('./../../server/db/db').models;
var collections = require('./../../server/db/db').collections;
var mobileApiRouter = require('./../../server/routes/mobile/mobileApiRouter');

describe('MobileAPI Integration Tests', function() {

  describe('mobile Dev', function() {

    it('should return array of all events when GET /api/mobile/events', function(done) {
      request(app)
        .get('/api/mobile/events')
        .end(function(err, res) {
          console.log('test!',res.body);
          var events = res.body;
          assert.isArray(events);
          done();
        });
    });

    it('should return actions when GET /api/mobile/actions/:regionId', function(done) {
      request(app)
        .get('/api/mobile/actions/1')
        .end(function(err, res) {
          //res.body has 2
          assert.equal(res.body.length, 2, 'should be same');
          done();
        });
    });

    it('should return 400 when GET action with invalid regionId', function(done) {
      request(app)
        .get('/api/mobile/actions/300')
        .expect(400, done);
    });


  });
});