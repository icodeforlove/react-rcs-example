var React = require('react'),
	App = require('../build-dev/components/App.js'),
	Joi = require('joi');

module.exports = [
	{
		method: 'GET',
		path: '/{nowShowing?}',

		config: {
	    	validate: {
	    	    params: {
	    	        nowShowing: Joi.string().regex(/^(?:|active|completed)$/).required()
	    	    }
	    	},
			handler: function (request, reply) {

				reply(
					'<!doctype html>\n' +
					'<html lang="en" data-framework="react">' +
						'<head>' +
							'<meta charset="utf-8">' +
							'<title>React • TodoMVC</title>' +
							'<link rel="stylesheet" href="static/app.css">' +
						'</head>' +
						'<body id="app">' + React.renderComponentToString(App({nowShowing: request.params.nowShowing})) + '</body>' +
						'<script type="text/javascript" src="static/libs.js"></script>' +
						'<script type="text/javascript" src="static/app.js"></script>' +
					'</html>'
				);
			}
		}
	}
];