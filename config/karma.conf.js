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
            'Chrome'
        ],
        frameworks: [
            'jasmine'
        ],
        files: [
            './config/spec-bundle.js'
        ],
        preprocessors: {
            ['./config/spec-bundle.js']: [
                'webpack'
            ]
        },
        reporters: ['progress', 'coverage', 'kjhtml'],
        coverageReporter: {
            type: 'html',
            dir: 'coverage/'
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
        ]
    })
}
