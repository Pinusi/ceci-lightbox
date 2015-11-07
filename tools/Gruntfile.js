module.exports = function( grunt ) {

	var modules = [];
	var pkg = grunt.file.readJSON('package.json')

	for (var key in pkg.dependencies) {
		modules.push( key + "/**/*" );
	}

	require('load-grunt-tasks')(grunt);

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	grunt.initConfig({

	//Folders
	folder: {
		development: '../src',
		distribution: '../dist',
		temporary: '.tmp'
	},

	pkg: grunt.file.readJSON('package.json'),

	/**
	* Watch
	* https://github.com/gruntjs/grunt-contrib-watch
	*/
	watch: {
		scss: {
			files: [ "<%= folder.development %>/client/sass/{,*/,**/}*.scss" ],
			tasks: [ "sass" ]
		},
		js: {
			files: [ "<%= folder.development %>/client/app/js/{,*/,**/}*.js" ],
			tasks: [ "concat" ]
		},
		gruntfile: {
			files: ['Gruntfile.js'],
			tasks: ['build']
		},
		fonts:{
			files: ['<%= folder.development %>/client/assets/fonts/{,*/}*.*'],
			tasks: ['copy:fonts']
		},
		html:{
			files: ['<%= folder.development %>/client/index.html'],
			tasks: ['copy:html']
		},
		server:{
			files: ['<%= folder.development %>/server/{,*/,**/}*.*'],
			tasks: ['copy:server']
		},
		images:{
			files: ['<%= folder.development %>/client/assets/images/{,*/}*.{png,jpg,gif}'],
			tasks: ['copy:images']
		},
		livereload: {
			options: {
				livereload: '<%= connect.options.livereload %>'
			},
			files: [
				'<%= folder.distribution %>/client/{,*/,**/}*.*',
				'.rebooted'
			]
		}
	},

	// The actual grunt server settings
	connect: {
		options: {
			port: 5000,
			livereload: 35729,
			// Change this to '0.0.0.0' to access the server from outside
			hostname: '0.0.0.0'
		},
		livereload: {
			options: {
				open: true,
				base: ['<%= folder.distribution %>/client'],
			}
		}
	},

	concat: {
		options: {
			separator:  grunt.util.linefeed + ';' + grunt.util.linefeed,
		},
		scripts: {
			src: [
			'<%= folder.development %>/client/app/js/Model.js',
			'<%= folder.development %>/client/app/js/App.js',
			'<%= folder.development %>/client/app/js/Main.js'
			],
			dest: '<%= folder.distribution %>/client/js/main.min.js',
		}
	},

	copy: {
		fonts: {
			files: [{
				expand: true,
				dot: true,
				cwd: '<%= folder.development %>/client/assets',
				dest: '<%= folder.distribution %>/client/assets',
				src: [
					'fonts/{,*/,**/}*.*'
				]
			}]
		},
		server: {
			files: [{
				expand: true,
				dot: true,
				cwd: '<%= folder.development %>/server',
				dest: '<%= folder.distribution %>/server',
				src: [
				'**'
				]
			}]
		},
		copy_package: {
			files: [{
				expand: true,
				dot: true,
				cwd: '',
				dest: '<%= folder.distribution %>/server',
				src: [
				'package.json'
				]
			}]
		},
		modules: {
			files: [{
				expand: true,
				dot: true,
				cwd: 'node_modules',
				dest: '<%= folder.distribution %>/server/node_modules',
				src: modules
			}]
		},
		images: {
			files: [{
				expand: true,
				dot: true,
				cwd: '<%= folder.development %>/client/assets',
				dest: '<%= folder.distribution %>/client/assets',
				src: [
				'images/{,*/,**/}*.*'
				]
			}]
     	},
		html: {
			files: [{
				expand: true,
				dot: true,
				cwd: '<%= folder.development %>/client',
				dest: '<%= folder.distribution %>/client',
				src: [
				'index.html'
				]
			}]
		},
		favicons: {
			files: [{
				expand: true,
				dot: true,
				cwd: '<%= folder.development %>/client',
				dest: '<%= folder.distribution %>/client',
				src: [
				'favicon.ico'
				]
			}]
		}
	},

	sass: {
		dist: {
			options: {
				trace : true,
				style : "compressed",
				"sourcemap=none" : ""
			},
			files: {
				"<%= folder.distribution %>/client/css/main.css": "<%= folder.development %>/client/sass/main.scss"
			}
		}
	},

	nodemon: {
		dev: {
			script: '<%= folder.distribution %>/server/bin/www',
			options: {
				nodeArgs: ['--debug'],
				env: {
					PORT: '5455'
				},
				watch: ['<%= folder.distribution %>'],
				ignore: ['<%= folder.distribution %>/server/node_modules/**', '<%= folder.distribution %>/server/public/**'],
				// omit this property if you aren't serving HTML files and 
				// don't want to open a browser tab on start
				callback: function (nodemon) {
					nodemon.on('log', function (event) {
						console.log(event.colour);
					});

					// refreshes browser when server reboots
					nodemon.on('restart', function () {
						// Delay before server listens on port
						setTimeout(function() {
							require('fs').writeFileSync('.rebooted', 'rebooted');
						}, 2000);
					});
				}
			}
		}
	},

	concurrent: {
		dev: {
			tasks: ['nodemon', 'watch'], //'node-inspector'
			options: {
				logConcurrentOutput: true
			}
		}
	},

	// Empties folders to start fresh
	clean: {
		build: {
			src: ['<%= folder.distribution %>']
		},
		options:{
			force: true
		}
	}

});


	/**
	* tasks
	*/
	grunt.registerTask( "default", [
		'build',
		'connect:livereload',
		'concurrent'
		]);

	grunt.registerTask('build', [
		'clean:build',
		'sass',
		'concat',
		'copy'
		]);

};