const path = require('path');

module.exports = config => {
    config.set({

        // List of plugins to load
        plugins: [
            require('karma-jasmine'),
            require('karma-coverage'),
            require('karma-chrome-launcher'),
            require('karma-webpack'),
            require('karma-sourcemap-loader'),
            require('karma-jasmine-html-reporter')
        ],

        // Unit test frameworks
        frameworks: [
            'jasmine'
        ],

        // Preprocessors in Karma allow you to do some work with your files
        // before they get served to the browser.
        preprocessors: {
            './config/spec-bundle.js': ['webpack', 'sourcemap']
        },

        // The files array determines which files are included in the browser
        // and which files are watched and served by Karma.
        // Each file acts as entry point for the webpack configuration
        files: [

            // equal to {pattern: './config/spec-bundle.js', watched: true, served: true, included: true}
            './config/spec-bundle.js'
        ],

        // Used to resolve all relative paths defined in files and exclude
        basePath: path.join(__dirname, '../'),

        // Run many times
        singleRun: false,

        // Watch file changes, and restart test
        autoWatch: true,

        // Log info
        logLevel: config.LOG_INFO,

        // A list of browsers to launch and capture, when not find, it will lookup customLaunchers
        browsers: [
            'ChromeHeadlessLocal'
        ],

        // Custom browser launchers
        customLaunchers: {
            ChromeHeadlessLocal: {
                base: 'ChromeHeadless',
                flags: [
                    '--window-size=1024,768'
                ]
            }
        },

        // A list of reporters to use. Possible Values are "dots" or "progress"
        reporters: ['dots'],

        // Karma coverage reporter setting
        coverageReporter: {
            type: 'json-summary',
            dir: 'coverage/',
            subdir: '.'
        },

        // webpack config
        webpack: require('./webpack.test')(),

        // webpack-dev-middleware configuration
        webpackMiddleware: {
            noInfo: true
        },

        // other karma env config
        browserDisconnectTimeout: 20000,
        browserNoActivityTimeout: 240000,
        captureTimeout: 120000,

        // client args
        client: {

            // If true, Karma clears the context window upon the completion of running the tests.
            clearContext: false,

            // jasmine args
            jasmine: {
                random: false
            }
        }
    })
}
