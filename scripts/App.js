/**
 * @jsx React.DOM
 */

'use strict';

// include required global scripts
window.React = require('react-with-addons');

// load RCS, and initialize settings
require('./rcs.settings.js')(require('react-rcs/properties'));
require('react-rcs');

var Footer = require('./Footer'),
	TodoItem = require('./TodoItem'),
	TodoModel = require('./TodoModel'),
	Constants = require('./Constants'),
	Director = require('director');

var ENTER_KEY = 13;

var App = React.createClass({
	getInitialState: function () {
		return {
			nowShowing: Constants.ALL_TODOS,
			editing: null
		};
	},

	componentDidMount: function () {
		var setState = this.setState;
		var router = Director.Router({
			'/': setState.bind(this, {nowShowing: Constants.ALL_TODOS}),
			'/active': setState.bind(this, {nowShowing: Constants.ACTIVE_TODOS}),
			'/completed': setState.bind(this, {nowShowing: Constants.COMPLETED_TODOS})
		});
		router.init('/');
	},

	handleNewTodoKeyDown: function (event) {
		if (event.which !== ENTER_KEY) {
			return;
		}

		var val = this.refs.newField.getDOMNode().value.trim();

		if (val) {
			this.props.model.addTodo(val);
			this.refs.newField.getDOMNode().value = '';
		}

		return false;
	},

	toggleAll: function (event) {
		var checked = event.target.checked;
		this.props.model.toggleAll(checked);
	},

	toggle: function (todoToToggle) {
		this.props.model.toggle(todoToToggle);
	},

	destroy: function (todo) {
		this.props.model.destroy(todo);
	},

	edit: function (todo, callback) {
		// refer to todoItem.js `handleEdit` for the reasoning behind the
		// callback
		this.setState({editing: todo.id}, function () {
			callback();
		});
	},

	save: function (todoToSave, text) {
		this.props.model.save(todoToSave, text);
		this.setState({editing: null});
	},

	cancel: function () {
		this.setState({editing: null});
	},

	clearCompleted: function () {
		this.props.model.clearCompleted();
	},

	render: function () {
		var footer;
		var main;
		var todos = this.props.model.todos;

		var shownTodos = todos.filter(function (todo) {
			switch (this.state.nowShowing) {
			case Constants.ACTIVE_TODOS:
				return !todo.completed;
			case Constants.COMPLETED_TODOS:
				return todo.completed;
			default:
				return true;
			}
		}, this);

		var todoItems = shownTodos.map(function (todo) {
			return (
				<TodoItem
					key={todo.id}
					todo={todo}
					onToggle={this.toggle.bind(this, todo)}
					onDestroy={this.destroy.bind(this, todo)}
					onEdit={this.edit.bind(this, todo)}
					editing={this.state.editing === todo.id}
					onSave={this.save.bind(this, todo)}
					onCancel={this.cancel}
				/>
			);
		}, this);

		var activeTodoCount = todos.reduce(function (accum, todo) {
			return todo.completed ? accum : accum + 1;
		}, 0);

		var completedCount = todos.length - activeTodoCount;

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

var model = new TodoModel('react-todos');

function render() {
	React.renderComponent(
		<App model={model}/>,
		document.getElementById('app')
	);
}

model.subscribe(render);
render();