/** @jsx React.DOM */
'use strict';
 
var React = require('react');

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
							href="#"
							onClick={this.props.onShowAll}
							classes={cx({selected: nowShowing === 'all'})}>
								All
						</a>
					</li>
					{' '}
					<li>
						<a
							onClick={this.props.onShowActive}
							classes={cx({selected: nowShowing === 'active'})}>
								Active
						</a>
					</li>
					{' '}
					<li>
						<a
							onClick={this.props.onShowCompleted}
							classes={cx({selected: nowShowing === 'completed'})}>
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