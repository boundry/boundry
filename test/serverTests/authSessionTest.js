var request = require('supertest');
var app = require('./../../server/server.js');
var assert = require('chai').assert;
var should = require('should');
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

// //If LOCAL_DB_TESTING is set, use a local db called 'boundrydb_test'. Otherwise

// var knex = require('knex')(dbConfig.database);  
// console.log("CONNECTING TO DB: ", dbConfig.database.connection);


describe('Auth and Session Tests', function() {
  this.timeout(10000); //10 sec timeout

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

  it('should signup a new org successfully', function(done) {
    request(app)
      .post('/signup')
      .send({ name: 'testName', email: 'test@gmail.com', password: 'testpw'})
      .expect(201, done)
  });
  
  it('should return error if attempting to signup with a used email', function(done) {
    request(app)
      .post('/signup')
      .send({ name: 'testName2', email: 'test@gmail.com', password: 'testpw2'})
      .expect(403, done); 
  });
 

  it('should login a new org successfully', function(done) {
    request(app)
      .post('/login')
      .send({ name: 'testName', email: 'test@gmail.com', password: 'testpw'})
      .end(function(err, res) {
        assert.equal('email=test%40gmail.com; Path=/',res.headers['set-cookie'][0], 'should be same');
        done();
      });
  });

  it('should return error if attempting to login with a wrong password', function(done) {
    request(app)
      .post('/login')
      .send({ name: 'testName', password: 'tpw'})
      .expect(401, done);
  });

  it ('should send 200 when logout if a user is logged in', function(done) {
    request(app)
      .get('/logout')
      .set('Cookie', ['email=anothertest%40gmail.com'])
      .expect(200, done);

  });

  it ('should return 400 when logout if no user is logged in', function(done) {
    request(app)
      .get('/logout')
      .expect(400,done);
  });

});
