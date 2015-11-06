module.exports = function( grunt ) {

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
            api:{
                files: ['<%= folder.development %>/api/{,*/}*.*'],
                tasks: ['copy:api']
            },
            html:{
                files: ['<%= folder.development %>/client/index.html'],
                tasks: ['copy:html']
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
                        '<%= folder.distribution %>/{,*/,**/}*.*'
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
                    base: ['<%= folder.distribution %>'],
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
            dest: '<%= folder.distribution %>/js/main.min.js',
          }
        },

        copy: {
            fonts: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= folder.development %>/client/assets',
                    dest: '<%= folder.distribution %>/assets',
                    src: [
                        'fonts/{,*/,**/}*.*'
                    ]
                }]
            },
            images: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= folder.development %>/client/assets',
                    dest: '<%= folder.distribution %>/assets',
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
                    dest: '<%= folder.distribution %>',
                    src: [
                        'index.html'
                    ]
                }]
            },
            api: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= folder.development %>',
                    dest: '<%= folder.distribution %>',
                    src: [
                        'api/{,*/,**/}*.*'
                    ]
                }]
            },
            favicons: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= folder.development %>',
                    dest: '<%= folder.distribution %>',
                    src: [
                        'favicon.ico'
                    ]
                }]
            }
        },

        // /**
        //  * Sass compilation
        //  * https://github.com/gruntjs/grunt-contrib-sass
        //  * auto|file|inline|none
        //  */
         sass: {
            dist: {
                options: {
                    trace : true,
                    style : "compressed",
                    "sourcemap=none" : ""
                },
                files: {
                    "<%= folder.distribution %>/css/main.css": "<%= folder.development %>/client/sass/main.scss"
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

    } );


    /**
     * tasks
     */
     grunt.registerTask( "default", [
        'build',
        'connect:livereload',
        "watch"
    ]);

    grunt.registerTask('build', [
        'clean:build',
        'sass',
        'concat',
        'copy'
    ]);

 };