/*global module*/

module.exports = function (grunt) {
    grunt.initConfig({
        clean: {
            clean: ['dist', 'dist-test']
        },
        eslint: {
            target: ['src/**/*.js', 'test/**/*.js'],
            options: {
                quiet: true
            }
        },
        concat: {
            dist: {
                src: ['src/Values.js', 'src/VariableMatcher.js', 'src/RamlChecker.js'],
                dest: 'dist/concat.js'
            }
        },
        babel: {
            test: {
                files: [{
                    expand: true,
                    cwd: 'test',
                    src: ['**/*.js'],
                    dest: 'dist-test',
                    ext: '.spec.js'
                }]
            },
            dist: {
                options: {
                    sourceMap: true
                },
                files: {
                    'dist/raml-tester.js': 'dist/concat.js'
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
                    files: ['dist/raml-tester.js', 'dist-test/*.js'],
                    singleRun: true,
                    frameworks: ['jasmine'],
                    browsers: ['PhantomJS']
                }
            }
        },
        watch: {
            scripts: {
                files: ['src/**/*.js', 'test/**/*.js'],
                tasks: ['test']
            }
        }
    });

    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['eslint', 'concat', 'babel', 'babel:test', 'karma', 'uglify']);
    grunt.registerTask('test', ['eslint', 'concat', 'babel', 'babel:test', 'karma']);
};
