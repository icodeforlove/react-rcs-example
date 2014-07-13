'use strict';

module.exports = function(grunt) {
	grunt.initConfig({
		rcs: {
			all: {
				src: ['scripts/**/*.rcs'],
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
				src: ['scripts/main.js'],
				dest: 'build/app.js',
				options: {
					noparse: ['react-with-addons'],
					bundleOptions: {
						debug: true
					}
				}
			}
		},

		concat: {
		    options: {
		      separator: ';',
		    },
			build: {
				src: [
					//'./bower_components/jquery/dist/jquery.min.js',
					'./bower_components/zepto/zepto.min.js',
					'./bower_components/underscore/underscore.js',
					'./bower_components/backbone/backbone.js',
					'./bower_components/backbone.localstorage/backbone.localstorage.js',
					'./bower_components/react/react-with-addons.js',
					//'./scripts/rcs.settings.js',
					'./bower_components/react-rcs/rcs.js',
					//'./bower_components/react-rcs/rcs-with-transformer.js',
					//'build/app.js'
				],
				dest: 'build/libs.js'
			}
		},

		uglify: {
			my_target: {
				files: {
					'build/main.min.js': ['build/libs.js', 'build/app.js']
				}
			}
		},

		watch: {
			rcs: {
				files: ['scripts/**/*.rcs'],
				tasks: ['rcs:all']
			},

			jsx: {
				files: ['scripts/**/*.js', 'scripts/**/*.jsx'],
				tasks: ['build-dev']
			}
		}
	});

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-react');
	grunt.loadNpmTasks('grunt-react-rcs');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('build-dev', ['browserify', 'concat', 'rcs:all']);
	grunt.registerTask('build', ['browserify', 'concat', 'uglify', 'rcs:all']);
};