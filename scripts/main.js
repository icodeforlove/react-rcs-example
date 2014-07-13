var TodosCollection = require('./models/TodosCollection'),
	todos = new TodosCollection(),
	App = require('./jsx/App.jsx');

function render() {
	React.renderComponent(
		new App({todos:todos}),
		document.getElementById('app')
	);
}

render();