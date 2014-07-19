var Backbone = require('backbone'),
	Collection = Backbone.Collection.extend({});

// if we are rendering via the server we do not need to sync our models
if (typeof process && process.title === 'node') {
	Collection.prototype.sync = function() { return null; };
	Collection.prototype.fetch = function() { return null; };
	Collection.prototype.save = function() { return null; };
}

module.exports = Collection;