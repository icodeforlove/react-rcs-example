'use strict';

module.exports = function(grunt) {
	grunt.initConfig({
		// convert all .jsx files to .js files in a tmp/output directory
		react: {
			options: {
				harmony: true
			},

			build: {
				files: [
					{
						expand: true,
						cwd: 'scripts',
						src: ['**/*.jsx'],
						dest: 'tmp/output',
						ext: '.js'
					}
				]
			}
		},

		// copy all .js files to our tmp/output
		copy: {
			js: {
				files: [
					{expand: true, cwd: 'scripts/', src: ['**/*.js'], dest: 'tmp/output/'}
				]
			},

			rcs: {
				files: [
					{expand: true, cwd: 'scripts/', src: ['**/*.rcs'], dest: 'tmp/output/'}
				]
			}
		},

		// browserify our tmp/output
		browserify: {
			options: {
				bundleOptions: {
					debug: true
				}
			},

			build: {
				src: ['tmp/output/main.js'],
				dest: 'build/app.js'
			}
		},

		// generate an external source map for our build
		exorcise: {
			build: {
				options: {},
				files: {
					'build/app.map': ['build/app.js']
				}
			}
		},

		// parse our rcs
		rcs: {
			config: {
				settings: 'scripts/rcs.settings.js'
			},

			// look into fixing settings and adding it as an option
			build: {
				src: ['tmp/output/**/*.rcs'],
				dest: 'tmp/output/'
			}
		},

		// build our css files based on js maps
		mapcatenate: {
			config: {
				srcExtension: '.js',
				destExtension: '.css'
			},

			build: {
				files: {
					'build/app.css': 'build/app.map'
				}
			}
		},

		// remove all project temp files
		clean: {
			build: ['tmp'],
			cache: ['.rcscache']
		},

		// create a libs.js build
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

		// concat and uglify our libs and app
		uglify: {
			build: {
				files: {
					'build/main.min.js': ['build/libs.js', 'build/app.js']
				}
			}
		},

		// watch any important files
		watch: {
			build: {
				files: ['scripts/**/*.rcs', 'scripts/**/*.js', 'scripts/**/*.jsx'],
				tasks: ['build-dev']
			},

			livereload: {
				options: { livereload: true },
				files: ['build/**/*']
			}
		}
	});

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-react');
	grunt.loadNpmTasks('grunt-react-rcs');
	grunt.loadNpmTasks('grunt-mapcatenate');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-exorcise');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.registerTask('build-dev', ['copy', 'react', 'browserify', 'exorcise', 'rcs', 'mapcatenate', 'clean']);
	grunt.registerTask('build', ['build-dev', 'concat', 'uglify']);
};