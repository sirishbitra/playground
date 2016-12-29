'use strict';
module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Show grunt task time
    require('time-grunt')(grunt);

    // Configurable paths for the app
    var appConfig = {
        app: 'app',
        dist: {'admin':'dist/admin', 'analytics':'dist/analytics', 'index':'dist/index'}
    };

    // Grunt configuration
    grunt.initConfig({

        // Project settings
        bitraz: appConfig,

        // The grunt server settings
        connect: {
            options: {
                port: 3300,
                hostname: 'localhost',
                livereload: 35730
            },
            livereload: {
                options: {
                    open: true,
                    middleware: function (connect) {
                        return [
                            connect.static('.tmp'),
                            connect().use(
                                '/bower_components',
                                connect.static('./bower_components')
                            ),
                            connect.static(appConfig.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= bitraz.dist %>'
                }
            }
        },
        // Compile less to css
        less: {
            development: {
                options: {
                    compress: true,
                    optimization: 2
                },
                files: {
                    "app/styles/style.css": "app/less/style.less"
                }
            }
        },
        // Watch for changes in live edit
        watch: {
            styles: {
                files: ['app/less/**/*.less'],
                tasks: ['less', 'copy:styles'],
                options: {
                    nospawn: true,
                    livereload: '<%= connect.options.livereload %>'
                },
            },
            js: {
                files: ['<%= bitraz.app %>/scripts/{,*/}*.js'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= bitraz.app %>/**/*.html',
                    '.tmp/styles/{,*/}*.css',
                    '<%= bitraz.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },
        babel: {
                options: {
                    sourceMap: true,
                    presets: ['es2015']
                },
                dist: {
                    files: {
                        '.tmp/concat/scripts/scripts.js': '.tmp/concat/scripts/scripts.js'
                    }
                }

            /*admin: {
                options: {
                    sourceMap: true,
                    presets: ['es2015']
                },
                dist: {
                    files: {
                        '.tmp/concat/scripts/_scripts.js': '.tmp/concat/scripts/scripts.js'
                    }
                }
            },
            index: {
                options: {
                    sourceMap: true,
                    presets: ['es2015']
                },
                dist: {
                    files: [{
                        expand: true,
                        cwd: '<%= bitraz.app %>',
                        src: ['<%= bitraz.dist.index %>/scripts/{,*!/}*.js'],
                        dest: '<%= bitraz.dist.index %>'
                    }]
                }
            },
            analytics: {
                options: {
                    sourceMap: true,
                    presets: ['es2015']
                },
                dist: {
                    files: [{
                        expand: true,
                        cwd: '<%= bitraz.app %>',
                        src: ['<%= bitraz.dist.analytics %>/scripts/{,*!/}*.js'],
                        dest: '<%= bitraz.dist.analytics %>'
                    }]
                }
            }*/
        },
        uglify: {
            options: {
                mangle: false
            }
        },
        // Clean dist folder
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= bitraz.dist %>/**/{,*/}*',
                        '!<%= bitraz.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },
        // Copies remaining files to places other tasks can use
        copy: {
            index: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= bitraz.app %>',
                        dest: '<%= bitraz.dist.index %>',
                        src: [
                            '*.{ico,png,txt}',
                            '.htaccess',
                            'index.html',
                            'login.html',
                            'views/common/{,*/}*.html',
                            'views/index/{,*/}*.html',
                            'styles/img/*.*',
                            'images/{,*/}*.*'
                        ]
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: 'bower_components/fontawesome',
                        src: ['fonts/*.*'],
                        dest: '<%= bitraz.dist.index %>'
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: 'bower_components/bootstrap',
                        src: ['fonts/*.*'],
                        dest: '<%= bitraz.dist.index %>'
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: 'app/fonts/pe-icon-7-stroke/',
                        src: ['fonts/*.*'],
                        dest: '<%= bitraz.dist.index %>'
                    },
                ]
            },
            admin: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= bitraz.app %>',
                        dest: '<%= bitraz.dist.admin %>',
                        src: [
                            '*.{ico,png,txt}',
                            '.htaccess',
                            'admin.html',
                            'login.html',
                            'views/common/{,*/}*.html',
                            'views/admin/{,*/}*.html',
                            'styles/img/*.*',
                            'images/{,*/}*.*'
                        ]
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: 'bower_components/fontawesome',
                        src: ['fonts/*.*'],
                        dest: '<%= bitraz.dist.admin %>'
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: 'bower_components/bootstrap',
                        src: ['fonts/*.*'],
                        dest: '<%= bitraz.dist.admin %>'
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: 'app/fonts/pe-icon-7-stroke/',
                        src: ['fonts/*.*'],
                        dest: '<%= bitraz.dist.admin %>'
                    },
                ]
            },
            analytics: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= bitraz.app %>',
                        dest: '<%= bitraz.dist.analytics %>',
                        src: [
                            '*.{ico,png,txt}',
                            '.htaccess',
                            'analytics.html',
                            'login.html',
                            'views/common/{,*/}*.html',
                            'views/analytics/{,*/}*.html',
                            'styles/img/*.*',
                            'images/{,*/}*.*'
                        ]
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: 'bower_components/fontawesome',
                        src: ['fonts/*.*'],
                        dest: '<%= bitraz.dist.analytics %>'
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: 'bower_components/bootstrap',
                        src: ['fonts/*.*'],
                        dest: '<%= bitraz.dist.analytics %>'
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: 'app/fonts/pe-icon-7-stroke/',
                        src: ['fonts/*.*'],
                        dest: '<%= bitraz.dist.analytics %>'
                    },
                ]
            },
            styles: {
                expand: true,
                cwd: '<%= bitraz.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },
        // Renames files for browser caching purposes
        filerev: {
            index: {
                src: [
                    '<%= bitraz.dist.index %>/scripts/{,*/}*.js',
                    '<%= bitraz.dist.index %>/styles/{,*/}*.css',
                    '<%= bitraz.dist.index %>/styles/fonts/*'
                ]
            },
            admin: {
                src: [
                    '<%= bitraz.dist.admin %>/scripts/{,*/}*.js',
                    '<%= bitraz.dist.admin %>/styles/{,*/}*.css',
                    '<%= bitraz.dist.admin %>/styles/fonts/*'
                ]
            },
            analytics: {
                src: [
                    '<%= bitraz.dist.analytics %>/scripts/{,*/}*.js',
                    '<%= bitraz.dist.analytics %>/styles/{,*/}*.css',
                    '<%= bitraz.dist.analytics %>/styles/fonts/*'
                ]
            }
        },
        htmlmin: {
            index: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= bitraz.dist.index %>',
                    src: ['*.html', 'views/{,*/}*.html'],
                    dest: '<%= bitraz.dist.index %>'
                }]
            },
            admin: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= bitraz.dist.admin %>',
                    src: ['*.html', 'views/{,*/}*.html'],
                    dest: '<%= bitraz.dist.admin %>'
                }]
            },
            analytics: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= bitraz.dist.analytics %>',
                    src: ['*.html', 'views/{,*/}*.html'],
                    dest: '<%= bitraz.dist.analytics %>'
                }]
            }
        },
        useminPrepare: {
            index: {
                src:['app/index.html'],
                options: {
                            dest: 'dist/index'
                        }
            },
            admin: {
                src:['app/admin.html'],
                options: {
                    dest: 'dist/admin'
                }
            },
            analytics: {
                src:['app/analytics.html'],
                options: {
                    dest: 'dist/analytics'
                }
            }
        },
        usemin: {
            html: ['<%= bitraz.dist.index %>/index.html', '<%= bitraz.dist.admin %>/admin.html', '<%= bitraz.dist.analytics %>/analytics.html'],
        }
    });

    grunt.registerTask('live', [
        'clean:server',
        'copy:styles',
        'connect:livereload',
        'watch'
    ]);

    grunt.registerTask('server', [
        'buildAdmin',
        'buildIndex',
        'buildAnalytics',
        'connect:dist:keepalive'
    ]);

    // grunt.registerTask('buildAll', [
    //     'clean:dist',
    //     'less',
    //     'buildIndex',
    //     'buildAdmin',
    //     'buildAnalytics'
    //
    // ]);

    grunt.registerTask('buildIndex', [
        'clean:dist',
        'less',
        'useminPrepare:index',
        'concat',
        'babel',
        'copy:index',
        'cssmin',
        'uglify',
        // 'filerev:index',
        'usemin:html:index',
        'htmlmin:index'
    ]);

    grunt.registerTask('buildAdmin', [
        'clean:dist',
        'less',
        'useminPrepare:admin',
        'concat',
        'babel',
        'copy:admin',
        'cssmin',
        'uglify',
        // 'filerev:index',
        'usemin:html:admin',
        'htmlmin:admin'
    ]);

    grunt.registerTask('buildAnalytics', [
        'clean:dist',
        'less',
        'useminPrepare:analytics',
        'concat',
        'babel',
        'copy:analytics',
        'cssmin',
        'uglify',
        // 'filerev:index',
        'usemin:html:analytics  ',
        'htmlmin:analytics'
    ]);

};
