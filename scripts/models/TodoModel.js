var Backbone = require('backbone'),
	Model = require('./Model');

var TodoModel = Model.extend({
	// Default attributes for the todo
	// and ensure that each todo created has `title` and `completed` keys.
	defaults: {
		title: '',
		completed: false
	},

	// Toggle the `completed` state of this todo item.
	toggle: function () {
		this.save({
			completed: !this.get('completed')
		});
	},

	sync: function () {
		if (typeof window !== 'undefined') {
			Backbone.Model.prototype.sync.apply(this, arguments);
		}
	}
});

module.exports = TodoModel;