var React = require('react'),
	App = require('../build-dev/components/App.js'),
	Joi = require('joi');

module.exports = [
	{
		method: 'GET',
		path: '/',

		config: {
			handler: function (request, reply) {
				reply(
					'<!doctype html>' +
					'<html lang="en" data-framework="react">' +
						'<head>' +
							'<meta charset="utf-8">' +
							'<title>React • TodoMVC</title>' +
							'<link rel="stylesheet" href="app.css">' +
						'</head>' +
						'<body id="app">' + React.renderComponentToString(App()) + '</body>' +
						'<script type="text/javascript" src="libs.js"></script>' +
						'<script type="text/javascript" src="app.js"></script>' +
					'</html>'
				);
			}
		}
	}
];