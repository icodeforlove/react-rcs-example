/** @jsx React.DOM */
'use strict';

var Backbone = require('backbone'),
	React = require('react'),
	Footer = require('./Footer'),
	TodoItem = require('./TodoItem'),
	BackboneMixin = require('./mixins/BackboneMixin');

var ENTER_KEY = 13;

var App = React.createClass({
	mixins: [BackboneMixin],

	getBackboneCollections: function () {
		return [this.props.todos];
	},

	getInitialState: function () {
		return {editing: null};
	},

	componentDidMount: function () {
		var Router = Backbone.Router.extend({
			routes: {
				'': 'all',
				'active': 'active',
				'completed': 'completed'
			},
			all: this.setState.bind(this, {nowShowing: 'all'}),
			active: this.setState.bind(this, {nowShowing: 'active'}),
			completed: this.setState.bind(this, {nowShowing: 'completed'})
		});

		new Router();
		Backbone.history.start();

		this.props.todos.fetch();
	},

	componentDidUpdate: function () {
		// If saving were expensive we'd listen for mutation events on Backbone and
		// do this manually. however, since saving isn't expensive this is an
		// elegant way to keep it reactively up-to-date.
		this.props.todos.forEach(function (todo) {
			//todo.save();
		});
	},

	handleNewTodoKeyDown: function (event) {
		if (event.which !== ENTER_KEY) {
			return;
		}

		var val = this.refs.newField.getDOMNode().value.trim();
		if (val) {
			this.props.todos.create({
				title: val,
				completed: false,
				order: this.props.todos.nextOrder()
			});
			this.refs.newField.getDOMNode().value = '';
		}

		return false;
	},

	toggleAll: function (event) {
		var checked = event.target.checked;
		this.props.todos.forEach(function (todo) {
			todo.set('completed', checked);
		});
	},

	edit: function (todo, callback) {
		// refer to todoItem.jsx `handleEdit` for the reason behind the callback
		this.setState({editing: todo.get('id')}, callback);
	},

	save: function (todo, text) {
		todo.save({title: text});
		this.setState({editing: null});
	},

	cancel: function () {
		this.setState({editing: null});
	},

	clearCompleted: function () {
		this.props.todos.completed().forEach(function (todo) {
			todo.destroy();
		});
	},

	render: function () {
		var todos = this.props.todos,
			main,
			footer,
			shownTodos,
			todoItems,
			activeTodoCount = 0,
			completedCount = 0;

		// do we have any todos?
		if (todos) {
			shownTodos = todos.filter(function (todo) {
				if (this.state.nowShowing === 'active') {
					return !todo.get('completed');
				} else if (this.state.nowShowing === 'completed') {
					return todo.get('completed');
				} else {
					return true;
				}
			}, this);
		
			todoItems = shownTodos.map(function (todo) {
				return (
					<TodoItem
						key={todo.get('id')}
						todo={todo}
						onToggle={todo.toggle.bind(todo)}
						onDestroy={todo.destroy.bind(todo)}
						onEdit={this.edit.bind(this, todo)}
						editing={this.state.editing === todo.get('id')}
						onSave={this.save.bind(this, todo)}
						onCancel={this.cancel}
					/>
				);
			}, this);

			activeTodoCount = todos.reduce(function (accum, todo) {
				return todo.get('completed') ? accum : accum + 1;
			}, 0);

			completedCount = todos.length - activeTodoCount;

			if (activeTodoCount || completedCount) {
				footer =
					<Footer
						count={activeTodoCount}
						completedCount={completedCount}
						nowShowing={this.state.nowShowing}
						onClearCompleted={this.clearCompleted}
					/>;
			}

			if (todos.length) {
				main = (
					<section classes="main">
						<input
							classes="toggle-all"
							type="checkbox"
							onChange={this.toggleAll}
							checked={activeTodoCount === 0}
						/>
						<ul classes="todo-list">
							{todoItems}
						</ul>
					</section>
				);
			}
		}

		return (
			<div>
				<header classes="header">
					<h1>todos</h1>
					<input
						ref="newField"
						classes="new-todo"
						placeholder="What needs to be done?"
						onKeyDown={this.handleNewTodoKeyDown}
						autoFocus={true}
					/>
				</header>
				{main}
				{footer}
			</div>
		);
	}
});

module.exports = App;