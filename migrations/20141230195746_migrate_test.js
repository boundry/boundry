'use strict';

//TODO: Refactor the schema out into a separate file
exports.up = function(knex) {

        return knex.schema.createTable('organizer', function (organizer) {
          organizer.increments('id').primary();
          organizer.string('name', 255);
          organizer.string('email', 255);
          organizer.string('password', 255);
          organizer.timestamps();
        })

        .createTable('user', function (user) {
          user.string('id', 255).unique().primary(); //Generated on mobile client
          user.timestamps();
        })

        .createTable('event', function (event) {
          event.increments('id').primary();
          event.string('name', 255);
          event.dateTime('start_time'); //User provided start and end times
          event.dateTime('end_time');
          event.integer('organizer_id', 10).unsigned().references('organizer.id');
          event.timestamps();
        })

        .createTable('event_user', function (event_user) {
          event_user.increments('id').primary();
          event_user.string('user_id', 255).references('user.id');
          event_user.integer('event_id', 10).unsigned().references('event.id');
          event_user.timestamps();
        })

        .createTable('region', function (region) {
          region.increments('id').primary();
          region.string('name', 255);
          region.text('region_attr'); //text type allows > 255 chars
          region.integer('event_id', 10).unsigned().references('event.id');
          region.timestamps();
        })

        .createTable('action', function (action) {
          action.increments('id').primary();
          action.string('name', 255);
          action.string('action_type', 255);
          action.string('action_data', 255); //Maybe: break out into 'assets' table
          action.integer('region_id', 10).unsigned().references('region.id');
          action.timestamps();
        })

        .createTable('locationData', function (locationData) {
          locationData.increments('id').primary();
          locationData.decimal('latitude', 10, 6);
          locationData.decimal('longitude', 10, 6);
          locationData.integer('user_id', 10).unsigned().references('user.id');
          locationData.integer('event_id', 10).unsigned().references('event.id');
          locationData.integer('region_id', 10).unsigned().references('region.id');
          locationData.timestamps();
        })

        .then(function() {
          console.log('ALL TABLES MADE');
        })

        .catch(function(e) {
          console.log(e);
        });
};

//TODO: Make this cleaner
exports.down = function(knex) {
  return knex.raw('SET foreign_key_checks = 0;')
  .then(function(){
    return [
      'action',
      'region',
      'event_user',
      'event',
      'user',
      'organizer',
      'locationData'
    ];
  })
  .reduce(function(memo, table) {
    return knex.schema.dropTableIfExists(table).then(function() { return memo++; });
  }, 0)
  .finally(function(){
    return knex.raw('SET foreign_key_checks = 1;');
  });
};
