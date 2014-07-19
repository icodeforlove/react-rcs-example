/** @jsx React.DOM */
'use strict';
 
var React = require('react'),
	Constants = require('../Constants');

var Footer = React.createClass({
	render: function () {
		var activeTodoWord = this.props.count === 1 ? 'item' : 'items';
		var clearButton = null;

		if (this.props.completedCount > 0) {
			clearButton = (
				<button
					classes="clear-completed"
					onClick={this.props.onClearCompleted}>
					Clear completed ({this.props.completedCount})
				</button>
			);
		}

		// React idiom for shortcutting to `classSet` since it'll be used often
		var cx = React.addons.classSet;
		var nowShowing = this.props.nowShowing;
		return (
			<footer classes="footer">
				<span classes="todo-count">
					<strong>{this.props.count}</strong> {activeTodoWord} left
				</span>
				<ul classes="filters">
					<li>
						<a
							href="#/"
							classes={cx({selected: nowShowing === Constants.ALL_TODOS})}>
								All
						</a>
					</li>
					{' '}
					<li>
						<a
							href="#/active"
							classes={cx({selected: nowShowing === Constants.ACTIVE_TODOS})}>
								Active
						</a>
					</li>
					{' '}
					<li>
						<a
							href="#/completed"
							classes={cx({selected: nowShowing === Constants.COMPLETED_TODOS})}>
								Completed
						</a>
					</li>
				</ul>
				{clearButton}
			</footer>
		);
	}
});

module.exports = Footer;