App = Ember.Application.create();

// --- Routes ---

App.Router.map(function() {
  this.resource('records', function() {
    this.resource('record', { path: ':record_id' });
  });
});

App.IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('records');
  }
});

App.RecordsRoute = Ember.Route.extend({
  model: function() {
    return App.Record.find();
  }
});

// --- Models ---

App.Record = Ember.Object.extend();

App.Record.find = function(id) {
  if (Ember.isNone(id)) {
    return App.Record.store.all();
  } else {
    return App.Record.store.find(id);
  }
}

// --- Store ---

App.RecordStore = Ember.Object.extend({
  url: 'https://docs.google.com/spreadsheet/pub?' +
       'key=0Aqx7vtK6RxxZdHhPM2RGTGlvTjZjeko2aWU4bDFDTGc' +
       '&output=csv',

  idMap: {},
  hydratedObjects: [],

  init: function() {
    this._super();
    this._fetch();
  },

  all: function() {
    return this.get('hydratedObjects');
  },

  find: function(id) {
    return this._objectFor(id);
  },


  _objectFor: function(id) {
    var idMap = this.get('idMap');

    return idMap[id] = idMap[id] ||
                       App.Record.create({ id: id });
  },

  _fetch: function() {
    var self = this;

    $.get(this.get('url')).then(function(csv) {
      var records = $.csv.toObjects(csv);

      records.forEach(function(record) {
        self._hydrateObject(record.id, record);
      });
    });
  },

  _hydrateObject: function(id, properties) {
    var object = this._objectFor(id);

    object.setProperties({
      name: properties.name,
      artist: properties.artist,
      art: properties.art,
      soundcloudUrl: properties.soundcloudUrl,
      soundcloudEmbed: properties.soundcloudEmbed,
      isLoaded: true
    });

    this.get('hydratedObjects').addObject(object);
  }

});

App.Record.store = App.RecordStore.create();
