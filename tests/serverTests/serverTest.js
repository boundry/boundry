var request = require('supertest');
var app = require('./../../server/server.js');
var assert = require('chai').assert;

describe('Server Tests', function() {

  describe('API', function() {

    it('should return array of all events when queried at /api/mobile/events', function(done) {
      request(app)
        .get('/api/mobile/events')
        .end(function(err, res) {
          var events = res.body;

          assert.isArray(events);

          assert.isObject(events[0])
          assert.isArray(events[0].regions);
          assert.isString(events[0].eventName);

          done();
        });
    });
  });

  describe('Auth', function() {
    
  });
});
