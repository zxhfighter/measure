import { task, watch } from 'gulp';
import { join } from 'path';
import { execNodeTask } from '../utils/task_helpers';
import { config } from '../utils/config';
import { sequenceTask } from '../utils/sequence-task';

const webpack = require('webpack');
const serve = require('browser-sync');
const webpackDevMiddelware = require('webpack-dev-middleware');
const webpackHotMiddelware = require('webpack-hot-middleware');
const webpackDevServer = require('webpack-dev-server');
const reqlib = require('app-root-path').require;
const launcher = reqlib('/node_modules/protractor/built/launcher');

/** Path to the directory where all config are created. */
const { projectPath, webpackConfigPath } = config;
const protractorConfigPath = join(projectPath, 'protractor.conf.js');

const PORT = '9019';
const buildConfigPath = join(config.webpackConfigPath, 'webpack.e2e.prod');
const devConfigPath = join(config.webpackConfigPath, 'webpack.e2e.dev');


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
    const buildConfig = require(buildConfigPath);
    const webpackCompiler = webpack(buildConfig);

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

task('protractor:test:watch', () => {
    watch([
        join(config.appPath, '**/*.+(html|ts|less)'),
        join(config.projectPath, 'src/e2e-demo/**/*.+(html|ts|less)')
    ], { debounceDelay: 700 }, ['protractor:test']);
});

task('e2e:build-e2e-demo', (cb?: Function) => {

    const buildConfig = require(buildConfigPath);
    const compiler = webpack(buildConfig, (err: any, stats: any) => {
        if (err) {
            console.log('webpack', err);
        }

        console.log('[webpack]', stats.toString({
            chunks: false,
            errorDetails: true
        }));

        if (cb) {
            cb();
        }
    });
});

task('e2e:build-e2e-demo:serve', () => {

    const devConfig = require(devConfigPath);
    const appEntry = devConfig.entry.app;
    devConfig.entry.app = [
        'webpack-hot-middleware/client?noInfo=true&reload=true',
        ...appEntry
    ];

    const compiler = webpack(devConfig);

    serve({
        port: process.env.PORT || 9019,
        open: true,
        server: { baseDir: config.appPath },
        middleware: [
            webpackDevMiddelware(compiler, {
                stats: {
                    chunks: false,
                    modules: false
                },
                publicPath: devConfig.output.publicPath
            }),
            webpackHotMiddelware(compiler)
        ]
    });
});
