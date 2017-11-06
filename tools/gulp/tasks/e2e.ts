import { task } from 'gulp';
import { join } from 'path';
import { execNodeTask } from '../utils/task_helpers';
import { config } from '../utils/config';
import { sequenceTask } from '../utils/sequence-task';

const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const reqlib = require('app-root-path').require;
const launcher = reqlib('/node_modules/protractor/built/launcher');

/** Path to the directory where all config are created. */
const { projectPath, webpackConfigPath } = config;
const protractorConfigPath = join(projectPath, 'protractor.conf.js');
const webpackConfig = join(webpackConfigPath, 'webpack.dev');

const PORT = '49152';

/**
 * protractor task
 */
task('e2e', sequenceTask(
    'protractor:setup',
    'protractor:test'
));

/** Ensures that protractor and webdriver are set up to run. */
task('protractor:setup', execNodeTask('protractor', 'webdriver-manager', ['update']));

/** Builds and serves demo app and protractor */
task('protractor:test', () => {
    const webpackDevServerConfig = { stats: { colors: true } };
    const webpackConfigLoaded = require(webpackConfig);
    const webpackCompiler = webpack(webpackConfigLoaded);

    /** runs protractor once the demo app is ready */
    webpackCompiler.plugin('done', function () {
        launcher.init(protractorConfigPath);
    });

    const server = new webpackDevServer(webpackCompiler, webpackDevServerConfig);
    server.listen(PORT, (err: any, _stats: any) => {
        if (err) {
            return err;
        }
    });
});

