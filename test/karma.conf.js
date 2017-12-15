const path = require('path');

module.exports = config => {

    config.set({

        // 基准路径，其余相对路径参照基准路径解析
        basePath: path.join(__dirname, '..'),

        // 单元测试框架
        frameworks: ['jasmine'],

        // 相关测试工具插件
        plugins: [

            // karma-jasmine 适配器
            require('karma-jasmine'),

            // karma chrome 浏览器启动器
            require('karma-chrome-launcher'),

            // karma sourcemap 加载器，便于调试测试代码
            require('karma-sourcemap-loader'),

            // karma 测试覆盖率功能
            require('karma-coverage')
        ],

        // 浏览器需要通过 script 引入，或者代码中通过 RequireJS 等引入的文件
        files: [

            // polyfills
            { pattern: 'node_modules/core-js/client/core.js', included: true, watched: false },
            { pattern: 'node_modules/tslib/tslib.js', included: true, watched: false },
            { pattern: 'node_modules/zone.js/dist/zone.js', included: true, watched: false },
            { pattern: 'node_modules/zone.js/dist/proxy.js', included: true, watched: false },
            { pattern: 'node_modules/zone.js/dist/sync-test.js', included: true, watched: false },
            { pattern: 'node_modules/zone.js/dist/jasmine-patch.js', included: true, watched: false },
            { pattern: 'node_modules/zone.js/dist/async-test.js', included: true, watched: false },
            { pattern: 'node_modules/zone.js/dist/fake-async-test.js', included: true, watched: false },
            { pattern: 'node_modules/hammerjs/hammer.min.js', included: true, watched: false },
            { pattern: 'node_modules/hammerjs/hammer.min.js.map', included: false, watched: false },
            { pattern: 'node_modules/moment/min/moment-with-locales.min.js', included: true, watched: false },

            // angular dependencies
            { pattern: 'node_modules/@angular/**/*', included: false, watched: false },
            { pattern: 'node_modules/rxjs/**/*', included: false, watched: false },

            // build packages
            { pattern: 'dist/packages/**/*', included: false, watched: true },
        ],

        // 自定义浏览器启动器
        customLaunchers: {
            ChromeHeadlessLocal: {
                base: 'ChromeHeadless',
                flags: [
                    '--window-size=1024,768'
                ]
            },
            ChromeHeadlessCI: {
                base: 'ChromeHeadlessLocal'
            }
        },

        // 文件预处理
        preprocessors: {
            'dist/packages/**/*.js': ['sourcemap']
        },

        // 报告提示方式
        reporters: ['dots'],

        // 不自动监测
        autoWatch: false,

        // 覆盖率报告配置
        coverageReporter: {
            type: 'json-summary',
            dir: 'dist/coverage/',
            subdir: '.'
        },

        // 浏览器失联最大时间
        browserDisconnectTimeout: 20000,

        // 浏览器无活动最大时间
        browserNoActivityTimeout: 240000,

        // 浏览器捕获时间
        captureTimeout: 120000,

        // 测试的浏览器
        browsers: ['ChromeHeadlessLocal'],

        // 是否只运行一次
        singleRun: false,

        // 浏览器日志配置
        browserConsoleLogOptions: {
            terminal: true,
            level: 'log'
        },

        // 客户端测试框架配置
        client: {
            jasmine: {
                random: false
            }
        }
    })
};
