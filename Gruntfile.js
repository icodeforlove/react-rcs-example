'use strict';

module.exports = function(grunt) {
	grunt.initConfig({
		// convert all .jsx files to .js files in a build-dev directory
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
						dest: 'build-dev',
						ext: '.js'
					}
				]
			}
		},

		// copy all .js files to our build-dev
		copy: {
			build: {
				files: [
					{expand: true, cwd: 'scripts/', src: ['**/*.js', '**/*.rcs'], dest: 'build-dev/'},
					{expand: true, src: ['assets/**/*'], dest: 'build/'},
					{expand: true, src: ['index.html'], dest: 'build/'}
				]
			}
		},

		// webpack our build-dev
		webpack: {
			build: {
				devtool: 'source-map',
				entry: './build-dev/main.js',
				output: {
					path: 'build/',
					filename: 'app.js'
				},
				externals: {
					react: 'React', 
					backbone: 'Backbone',
					'backbone.localstorage': 'BackboneLocalStorage',
					jquery: 'jQuery',
					underscore: '_'
				}
			}
		},

		// parse our rcs
		rcs: {
			options: {
				settings: 'rcs.settings.js'
			},

			build: {
				files: [
					{expand: true, cwd: 'scripts/', src: ['**/*.rcs'], dest: 'build-dev/'}
				]
			}
		},

		// build our css files based on js maps
		mapcatenate: {
			options: {
				srcExtension: '.js',
				destExtension: '.css'
			},

			build: {
				files: {
					'build/app.css': 'build/app.js.map'
				}
			}
		},

		// generate static hashes
		hashmap: {
			options: {
				output: 'assets/hashmap.json',
				rename: '#{= dirname}/#{= hash}.#{= basename}#{= extname}',
				keep: false,
				hashlen: 6
			},
			all: {
				cwd: 'build',
				src: 'assets/**/*.{css,js,pdf,eps,png,jpg,jpeg,gif,eot,svg,ttf,woff,otf}',
				dest: 'build'
			}
		},
		
		// modify css files with correct hashed names
		cssurlrev: {
			options: {
				assets: '<%= hashmap.options.output %>',
				hashmap_rename: '<%= hashmap.options.rename %>'
			},
			files: {
				src: ['build/*.css'],
			},
		},

		// remove all project temp files
		clean: {
			'build-assets': ['build/assets'],
			'build-dev': ['build-dev'],
			build: ['build'],
			cache: ['.rcscache']
		},

		//create a libs.js build
		concat: {
		    options: {
		      separator: ';',
		    },
			build: {
				src: [
					'./bower_components/zepto/zepto.min.js',
					'./bower_components/underscore/underscore.js',
					'./bower_components/backbone/backbone.js',
					'./bower_components/backbone.localstorage/backbone.localstorage.js',
					'./bower_components/react/react-with-addons.js',
					'./scripts/rcs.settings.js',
					'./bower_components/react-rcs/rcs.js'
				],
				dest: 'build/libs.js'
			}
		},

		// concat and uglify our libs and app
		uglify: {
			build: {
				files: {
					'build/main.min.js': ['build/app.js'],
					'build/libs.min.js': ['build/libs.js']
				}
			}
		},

		// watch any important files
		watch: {
			build: {
				files: ['scripts/**/*.js', 'scripts/**/*.jsx', 'scripts/**/*.rcs'],
				tasks: ['build-dev']
			},

			livereload: {
				options: { livereload: true },
				files: ['build/**/*.css', 'build/**/*.js']
			},

			cssurlrev: {
				files: ['assets/**/*.{css,js,pdf,eps,png,jpg,jpeg,gif,eot,svg,ttf,woff,otf}'],
				tasks: ['clean:build-dev', 'copy', 'hashmap', 'cssurlrev']
			}
		}
	});

	grunt.loadNpmTasks('grunt-webpack');
	grunt.loadNpmTasks('grunt-react');
	grunt.loadNpmTasks('grunt-react-rcs');
	grunt.loadNpmTasks('grunt-mapcatenate');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-hashmap');
	grunt.loadNpmTasks('grunt-cssurlrev');

	grunt.registerTask('build-dev', ['clean:build-assets', 'clean:build-dev', 'copy', 'react', 'webpack', 'rcs', 'mapcatenate', 'hashmap', 'cssurlrev']);
	grunt.registerTask('build', ['clean', 'build-dev', 'concat', 'uglify']);
	grunt.registerTask('bwatch', ['build', 'watch']);
};