// Karma configuration
// Generated on Tue Nov 01 2016 18:15:51 GMT+0200 (FLE Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        './TodoApi/node_modules/jquery/jquery.js',
        './TodoApi/wwwroot/node_modules/angular/angular.js',
        './TodoApi/wwwroot/node_modules/angular-ui-router/release/angular-ui-router.js',
        './todoApi.Test/node_modules/angular-mocks/angular-mocks.js',
        './TodoApi/wwwroot/app/todoApp.js',
        './TodoApi/wwwroot/app/service/todoService.js',
        './TodoApi/wwwroot/app/components/todoApp.components.js',
        './TodoApi/wwwroot/app/controllers/todoApp.controllers.js',
        './TodoApi/wwwroot/app/**/*.js',
        './TodoApi/wwwroot/app/**/*.html',
        './todoApi.Test/WebApp.Test/**/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        './TodoApi/wwwroot/app/**/*.html': ['ng-html2js']
    },



    ngHtml2JsPreprocessor: {
        // If your build process changes the path to your templates,
        // use stripPrefix and prependPrefix to adjust it.
        stripPrefix: 'TodoApi/wwwroot',

        // the name of the Angular module to create
        moduleName: 'testTemplates'
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
