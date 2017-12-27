const path = require('path');

module.exports = config => {
    config.set({
        basePath: path.join(__dirname, './'),
        singleRun: false,
        autoWatch: true,
        client: {
            clearContext: false
        },
        logLevel: config.LOG_INFO,
        junitReporter: {
            outputDir: './test-reports'
        },
        browsers: [
            'Chrome'
        ],
        frameworks: [
            'jasmine'
        ],
        files: [
            './spec-bundle.js'
        ],
        preprocessors: {
            ['./spec-bundle.js']: [
                'webpack'
            ]
        },
        reporters: ['progress', 'coverage', 'kjhtml'],
        coverageReporter: {
            type: 'html',
            dir: '../coverage/'
        },
        webpack: require('./webpack.test')(),
        webpackMiddleware: {
            noInfo: true
        },
        plugins: [
            require('karma-jasmine'),
            require('karma-junit-reporter'),
            require('karma-coverage'),
            require('karma-chrome-launcher'),
            require('karma-webpack'),
            require('karma-jasmine-html-reporter')
        ]
    })
}
