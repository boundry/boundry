var bluebird = require('bluebird');
var bcrypt = require('bcrypt-nodejs');

var makeModels = function (bookshelfObject) {

  var models = {};

  //Organizer - 
  models.Organizer = bookshelfObject.Model.extend({
    tableName: 'organizer',
    hasTimestamps: true,

    //When a new organizer is created, hash their pass
    initialize: function () {
      this.on('creating', this.hashPassword.bind(this));
    },

    hashPassword: function (model) {
      var cipher = bluebird.promisify(bcrypt.hash);
      return cipher(model.attributes.password, null, null)
        .then(function (hash) {
          delete model.attributes.password;
          delete this.password;
          model.attributes.password = hash;
          this.password = hash;
        }.bind(this));
    },
      //Password checking method
    checkPassword: function (password) {
      var compare = bluebird.promisify(bcrypt.compare);
      return compare(password, this.get('password'))
        .then(function (isMatch, err) {
          if (err) {
            console.log(err);
          }
          return isMatch;
        });
    },
      //Has many Events
    events: function() {
      return this.hasMany(models.Event);
    }
  });

  //User - 
  models.User = bookshelfObject.Model.extend({
    tableName: 'user',
    hasTimestamps: true,

    //Has many Events (many to many)
    events: function() {
      return this.belongsToMany(models.Event); //M-to-M requires belongsToMany
    },

    //Has many LocationData
    locationData: function() {
      return this.hasMany(models.LocationData);
    }
  });

  //Event - 
  models.Event = bookshelfObject.Model.extend({
    tableName: 'event',
    hasTimestamps: true,

    //Belongs to an Organizer
    organizer: function() {
      return this.belongsTo(models.Organizer);
    },
      //Has many Regions
    regions: function() {
      return this.hasMany(models.Region);
    },
      //Has many Users (many to many)
    users: function() {
      return this.belongsToMany(models.User); //M-to-M requires belongsToMany
    },

    //Has many LocationData
    locationData: function() {
      return this.hasMany(models.LocationData);
    }
  });

  //Region - 
  models.Region = bookshelfObject.Model.extend({
    tableName: 'region',
    hasTimestamps: true,

    //Belongs to an Event
    event: function() {
      return this.belongsTo(models.Event);
    },
      //Has many Actions
    actions: function() {
      return this.hasMany(models.Action);
    },

    //Has many LocationData
    locationData: function() {
      return this.hasMany(models.LocationData);
    }
  });

  //Action - 
  models.Action = bookshelfObject.Model.extend({
    tableName: 'action',
    hasTimestamps: true,

    //Belongs to a Region
    region: function() {
      return this.belongsTo(models.Region);
    }
  });

  //LocationData - 
  models.LocationData = bookshelfObject.Model.extend({
    tableName: 'locationData',
    hasTimestamps: true,

    //Belongs to a User
    user: function() {
      return this.belongsTo(models.User);
    },

    //Belongs to an Event
    event: function() {
      return this.belongsTo(models.Event);
    },

    //Belongs to a Region
    region: function() {
      return this.belongsTo(models.Region);
    }
  });

  return models;
};

module.exports = makeModels;
