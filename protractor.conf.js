const fs = require('fs');
const path = require('path');

// Load ts-node to be able to execute TypeScript files with protractor.
require('ts-node').register({
    project: path.join(__dirname, './e2e/')
});

const config = {
    framework: 'jasmine',
    useAllAngular2AppRoots: true,
    specs: [path.join(__dirname, './e2e/**/*.spec.ts')],
    baseUrl: 'http://localhost:9019',
    allScriptsTimeout: 120000,
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 120000,
        print: function() {}
    },
    directConnect: true,
    capabilities: {
        'browserName': 'chrome',
        'version': 'latest',
        'chromedriverVersion': '2.28',
        'name': 'measure E2E Tests',
        // Enables concurrent testing in the Webdriver. Currently runs five e2e files in parallel.
        'maxInstances': 5,
        'shardTestFiles': true
    }
};

exports.config = config;
