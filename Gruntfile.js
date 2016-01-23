module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        watch: {
            sass: {
                files: ['src/scss/**/*.scss'],
                tasks: ['sass:dev', 'postcss:dev']
            },
            js: {
                files: ['src/js/**/*.js'],
                tasks: ['eslint', 'uglify:dev']
            },
            templates: {
                files: ['src/templates/**/*.*'],
                tasks: ['copy:templates']
            },
            livereload: {
                options: { livereload: true },
                files: ['index.html', '*.js', '*.css']
            }
        },
        sass: {
            dev: {
                expand: true,
                cwd: 'src/scss',
                src: ['**/*.scss'],
                ext: '.css',
                options: {
                    style: 'expanded'
                }
            },
            prod: {
               expand: true,
                cwd: 'src/scss',
                src: ['**/*.scss'],
                ext: '.css',
                options: {
                    style: 'compressed',
                    sourcemap: 'none'
                }
            }
        },
        postcss: {
            options: {
                processors: [
                    require('autoprefixer-core')({browsers: 'last 2 versions'})
                ]
            },
            dev: {
                src: 'style.css',
                map: true
            },
            prod: {
                src: 'style.css'
            }
        },
        uglify: {
            dev: {
                options: {
                    sourceMap: true,
                    mangle: false,
                    beautify: true,
                    preserveComments: 'all',
                    compress: false
                },
                files: {
                    'script.js': ['src/js/**/*.js']
                }
            },
            prod: {
                files: {
                    'script.js': ['src/js/**/*.js']
                }
            }
        },
        copy: {
            templates: {
                cwd: 'src/templates',
                src: ['**/*.*', '!**/_*.*'],
                expand: true
            }
        },
        eslint: {
            target: ['src/js/**/*.js']
        }
    });

    grunt.registerTask('dev', 'Build development version of project', ['copy', 'eslint', 'uglify:dev', 'sass:dev', 'postcss:dev']);
    grunt.registerTask('prod', 'Build production version of project', ['copy', 'eslint', 'uglify:prod', 'sass:prod', 'postcss:prod']);
    grunt.registerTask('default', 'Build development version and run watch server', ['dev', 'watch']);
};
