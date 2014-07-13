var TodoModel = Backbone.Model.extend({
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
		console.log(arguments);
		Backbone.Model.prototype.sync.apply(this, arguments);
	}
});

module.exports = TodoModel;