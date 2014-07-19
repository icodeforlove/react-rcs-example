var config = require('config'),
	Hapi = require('hapi'),
    React = require('react');

// inject RCS into React
require('react-rcs/server')(React);

var server = new Hapi.Server(config.server.port, config.server.host);

server.start(function () {
    console.log('Server started at: ' + server.info.uri);
});

// register all routes
server.route(Array.prototype.concat.apply([], require('./routes')));