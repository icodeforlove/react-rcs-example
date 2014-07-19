var Backbone = require('backbone'),
	Model = Backbone.Model.extend({});

// if we are rendering via the server we do not need to sync our models
if (typeof process && process.title === 'node') {
	Model.prototype.sync = function() { return null; };
	Model.prototype.fetch = function() { return null; };
	Model.prototype.save = function() { return null; };
}

module.exports = Model;