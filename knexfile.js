//Config file for knex migration API



module.exports = {

  development: {  
    database: {
      client: 'mysql',
      connection: {
        host     : '127.0.0.1',
        user     : 'root',
        password : '',
        database : 'boundrydb_test',
        charset  : 'utf8'
      }
    },

    //Directory where migration files live
    directory: __dirname + '/migrations/',

    //Table name to hold info about migrations. Created if it doesn't already
    //exist
    tableName: 'development_migrations',

    pool: {
      min: 1,
      max: 1
    }
  },

  staging: {
    database: {
      client: 'mysql',
      connection: 'mysql://b52789d0935e42:d6117625@us-cdbr-iron-east-01.cleardb.net/heroku_37c0ba612787157?reconnect=true'
    },

    directory: __dirname + '/migrations/',

    tableName: 'staging_migrations',

    pool: {
      min: 1,
      max: 1
    }
  },

  production: {
    database: {
      client: 'mysql',
      connection: process.env.CLEARDB_DATABASE_URL
    },

    directory: __dirname + '/migrations/',

    tableName: 'production_migrations',

    pool: {
      min: 2,
      max: 10
    }
  }

};
