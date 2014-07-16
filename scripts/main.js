var TodosCollection = require('./models/TodosCollection'),
	todos = new TodosCollection(),
	App = require('./components/App');

function render() {
	React.renderComponent(
		new App({todos:todos}), document.getElementById('app')
	);
}

render();