'use strict';

module.exports = function(grunt) {
	grunt.initConfig({
		rcs: {
			all: {
				src: ['styles/*.rcs'],
				dest: 'build/app.css'
			},

			settings: 'scripts/rcs.settings.js'
		},

		react: {
			options: {
				harmony: true
			}
		},

		browserify: {
			options: {
				transform:  [
					function (code) {
						return require('grunt-react').browserify(code, {harmony: true});
					}
				]
			},
			build: {
				src: ['scripts/App.js'],
				dest: 'build/app.js',
				options: {
					noparse: ['react-with-addons'],
					bundleOptions: {
						debug: true
					}
				}
			}
		},

		watch: {
			rcs: {
				files: ['styles/*.rcs'],
				tasks: ['rcs:all']
			},

			jsx: {
				files: ['scripts/*.js', 'scripts/*.jsx'],
				tasks: ['build']
			}
		}
	});

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-react');
	grunt.loadNpmTasks('grunt-react-rcs');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('build', ['browserify', 'rcs:all']);
};