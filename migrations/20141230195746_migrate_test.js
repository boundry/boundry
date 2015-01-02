'use strict';

//TODO: Refactor so tables are always made in the right order, so as to avoid
//the occasional FK creation error, and get rid of console.logs
exports.up = function(knex, Promise) {
  return Promise.all([
      knex.raw('SET foreign_key_checks = 0;'),

      knex.schema.hasTable('organizer').then(function (exists) {
        if (!exists) {
          knex.schema.createTable('organizer', function (organizer) {
            organizer.increments('id').primary();
            organizer.string('name', 255);
            organizer.string('email', 255);
            organizer.string('password', 255);
            organizer.timestamps();
          }).then(function () {
            console.log('Created Table');
          });
        }
      }),

      knex.schema.hasTable('user').then(function (exists) {
        if (!exists) {
          knex.schema.createTable('user', function (user) {
            user.string('id', 255).unique().primary(); //Generated on mobile client
            user.timestamps();
          }).then(function () {
            console.log('Created Table');
          });
        }
      }),

      knex.schema.hasTable('event').then(function (exists) {
        if (!exists) {
          knex.schema.createTable('event', function (event) {
            event.increments('id').primary();
            event.string('name', 255);
            event.dateTime('start_time'); //User provided start and end times
            event.dateTime('end_time');
            event.integer('organizer_id', 10).unsigned().references('organizer.id');
            event.timestamps();
          }).then(function () {
            console.log('Created Table');
          });
        }
      }),

      knex.schema.hasTable('event_user').then(function (exists) {
        if (!exists) {
          knex.schema.createTable('event_user', function (event_user) {
            event_user.increments('id').primary();
            event_user.string('user_id', 255).references('user.id');
            event_user.integer('event_id', 10).unsigned().references('event.id');
            event_user.timestamps();
          }).then(function () {
            console.log('Created Table');
          });
        }
      }),

      knex.schema.hasTable('region').then(function (exists) {
        if (!exists) {
          knex.schema.createTable('region', function (region) {
            region.increments('id').primary();
            region.string('name', 255);
            region.text('coordinates'); //text type allows > 255 chars
            region.integer('event_id', 10).unsigned().references('event.id');
            region.timestamps();
          }).then(function () {
            console.log('Created Table');
          });
        }
      }),

      knex.schema.hasTable('action').then(function (exists) {
        if (!exists) {
          knex.schema.createTable('action', function (action) {
            action.increments('id').primary();
            action.string('name', 255);
            action.string('action_type', 255);
            action.string('action_data', 255); //Maybe: break out into 'assets' table
            action.integer('region_id', 10).unsigned().references('region.id');
            action.timestamps();
          }).then(function () {
            console.log('Created Table');
          });
        }
      }),

      knex.raw('SET foreign_key_checks = 1;')
    ]);
};

exports.down = function(knex) {
  return knex.raw('SET foreign_key_checks = 0;')
  .then(function(){
    return [
      'action',
      'region',
      'event_user',
      'event',
      'user',
      'organizer'
    ];
  })
  .reduce(function(memo, table) {
    return knex.schema.dropTable(table).then(function() { return memo++; });
  }, 0)
  .finally(function(){
    return knex.raw('SET foreign_key_checks = 1;');
  });
};
