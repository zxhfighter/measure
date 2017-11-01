/**
 * @file karma config
 * @author wanlingfeng(wanlingfeng@baidu.com)
 */

module.exports = function (config) {
    const testWebpackConfig = require('./webpack.test')();
    const configuration = {
        basePath: '',

        frameworks: ['jasmine'],

        exclude: [],

        client: {
            captureConsole: false
        },

        files: [
            {pattern: './config/spec-bundle.js', watched: false}
        ],

        proxies: {
            "/assets/": "/base/src/assets/"
        },

        preprocessors: {'./config/spec-bundle.js': ['coverage', 'webpack', 'sourcemap']},

        webpack: testWebpackConfig,

        coverageReporter: {
            type: 'in-memory'
        },

        remapCoverageReporter: {
            'text-summary': null,
            json: './coverage/coverage.json',
            html: './coverage/html'
        },

        webpackMiddleware: {
            noInfo: true,

            stats: {
                chunks: false
            }
        },

        reporters: ['mocha', 'coverage', 'remap-coverage'],

        port: 9876,

        colors: true,

        logLevel: config.LOG_WARN,

        autoWatch: false,

        browsers: ['Chrome'],

        customLaunchers: {
            ChromeTravisCi: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        },

        singleRun: true
    };

    if (process.env.TRAVIS) {
        configuration.browsers = [
            'ChromeTravisCi'
        ];
    }

    config.set(configuration);
};
