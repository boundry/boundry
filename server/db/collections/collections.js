var makeCollections = function (bookshelfObject, models) {
  var collections = {};

  collections.Organizers = bookshelfObject.Collection.extend({
    model: models.Organizer
  });

  collections.Users = bookshelfObject.Collection.extend({
    model: models.User
  });

  collections.Events = bookshelfObject.Collection.extend({
    model: models.Event
  });

  collections.Regions = bookshelfObject.Collection.extend({
    model: models.Region
  });

  collections.Actions = bookshelfObject.Collection.extend({
    model: models.Action
  });

  collections.LocationData = bookshelfObject.Collection.extend({
    model: models.LocationData
  });

  return collections;
};

module.exports = makeCollections;
