const path = require('path');

module.exports = config => {
    config.set({
        basePath: path.join(__dirname, '../'),
        singleRun: false,
        autoWatch: true,
        client: {
            clearContext: false
        },
        logLevel: config.LOG_INFO,
        browsers: [
            'ChromeHeadlessLocal'
        ],
        frameworks: [
            'jasmine'
        ],
        files: [
            './config/spec-bundle.js'
        ],
        preprocessors: {
            './config/spec-bundle.js': ['webpack']
        },
        reporters: ['dots'],
        coverageReporter: {
            type: 'json-summary',
            dir: 'coverage/',
            subdir: '.'
        },
        webpack: require('./webpack.test')(),
        webpackMiddleware: {
            noInfo: true
        },
        plugins: [
            require('karma-jasmine'),
            require('karma-coverage'),
            require('karma-chrome-launcher'),
            require('karma-webpack'),
            require('karma-jasmine-html-reporter')
        ],

        customLaunchers: {
            ChromeHeadlessLocal: {
                base: 'ChromeHeadless',
                flags: [
                    '--window-size=1024,768'
                ]
            }
        },

        browserDisconnectTimeout: 20000,
        browserNoActivityTimeout: 240000,
        captureTimeout: 120000,

        client: {
            jasmine: {
                // TODO(jelbourn): re-enable random test order once we can de-flake existing issues.
                random: false
            }
        }
    })
}
