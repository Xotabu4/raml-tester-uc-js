/*global module*/

module.exports = function (grunt) {
    grunt.initConfig({
        shell: {
            proxy: {
                command: 'raml-tester -rfile://test/data.raml -mtest/data -bdata'
            }
        },
        karma: {
            unit: {
                options: {
                    files: ['../raml-tester-proxy-node/src/raml-tester-browser.js', 'bower_components/angular/angular.js', 'bower_components/angular-mocks/angular-mocks.js', 'src/backend.js', 'test/**/*.js'],
                    singleRun: true,
                    frameworks: ['jasmine'],
                    browsers: ['Chrome']//,'Firefox','Safari']
                    //browsers: ['PhantomJS']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('default', ['shell']);
    grunt.registerTask('test', ['shell', 'karma']);
};
