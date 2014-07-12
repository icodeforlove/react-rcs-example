/**
 * @jsx React.DOM
 */
 'use strict';
 
var Constants = require('./Constants'),
	Utils = require('./Utils');

var Footer = React.createClass({
	render: function () {
		var activeTodoWord = Utils.pluralize(this.props.count, 'item');
		var clearButton = null;

		if (this.props.completedCount > 0) {
			clearButton = (
				<button
					class="clear-completed"
					onClick={this.props.onClearCompleted}>
					Clear completed ({this.props.completedCount})
				</button>
			);
		}

		// React idiom for shortcutting to `classSet` since it'll be used often
		var cx = React.addons.classSet;
		var nowShowing = this.props.nowShowing;
		return (
			<footer class="footer">
				<span class="todo-count">
					<strong>{this.props.count}</strong> {activeTodoWord} left
				</span>
				<ul class="filters">
					<li>
						<a
							href="#/"
							class={cx({selected: nowShowing === Constants.ALL_TODOS})}>
								All
						</a>
					</li>
					{' '}
					<li>
						<a
							href="#/active"
							class={cx({selected: nowShowing === Constants.ACTIVE_TODOS})}>
								Active
						</a>
					</li>
					{' '}
					<li>
						<a
							href="#/completed"
							class={cx({selected: nowShowing === Constants.COMPLETED_TODOS})}>
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