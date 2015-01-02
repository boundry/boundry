var dbConfig;

if (process.env.NODE_ENV === 'production') {
  dbConfig = require('./../../knexfile').production;
} else if (process.env.LOCAL_DB_TESTING){
  dbConfig = require('./../../knexfile').development;
} else {
  dbConfig = require('./../../knexfile').staging;
}


//Create knex object with db connection
var knex = require('knex')(dbConfig.database);

//Migrate to latest version of schema
knex.migrate.latest(dbConfig);


//Create bookshelf object using knex connection
var bookshelf = require('bookshelf')(knex);

//Initialize models with this bookshelf object
var models = require('./models/models')(bookshelf);

//Initialize collections with this bookshelf object
var collections = require('./collections/collections')(bookshelf, models);


//Export the newly initialized objects. 
module.exports = {
  models: models,
  collections: collections
};
