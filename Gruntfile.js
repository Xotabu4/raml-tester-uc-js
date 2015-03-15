/*global module*/

module.exports = function (grunt) {
    grunt.initConfig({
        eslint: {
            target: ['src/RamlChecker.js']
        },

        babel: {
            options: {
                sourceMap: true
            },
            test: {
                files: {
                    'dist-test/RamlChecker.spec.js': 'test/RamlChecker.spec.js'
                }
            },
            dist: {
                files: {
                    'dist/app.js': 'src/RamlChecker.js'
                }
            }
        },
        uglify: {
            dist: {
                src: 'dist/app.js',
                dest: 'dist/app.min.js'
            }
        },
        karma: {
            unit: {
                options: {
                    files: ['dist/*.js', 'dist-test/*.js'],
                    singleRun: true,
                    frameworks: ['jasmine'],
                    browsers: ['PhantomJS']
                }
            }
        },
        watch: {
            scripts: {
                files: ['src/**/*.js', 'test/**/*.js'],
                tasks: ['eslint', 'babel', 'babel:test', 'karma']
            }
        }
    });

    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['eslint', 'babel', 'babel:test', 'karma', 'uglify']);
};
