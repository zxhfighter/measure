import { task, src, dest } from 'gulp';
import { spawnSync } from 'child_process';
import { resolve, join } from 'path';
import { sequenceTask } from '../utils/sequence-task';
import { inlineAssetForDirectory } from '../utils/inline-asset';
import { copyTask } from '../utils/task_helpers';
import { config } from '../utils/config';
import { readFileSync, writeFileSync } from 'fs';
import { sync as glob } from 'glob';

const rollup = require('rollup');
const rollupNodeResolutionPlugin = require('rollup-plugin-node-resolve');
const rollupCommonjsPlugin = require('rollup-plugin-commonjs');
const htmlmin = require('gulp-htmlmin');
const less = require('gulp-less');
const lessAutoprefix = require('less-plugin-autoprefix');
const autoprefixPlugin = new lessAutoprefix({ browsers: ['last 2 versions'] });
const gulpCleanCss = require('gulp-clean-css');
const uglifyJS = require('uglify-js');
const replace = require('gulp-replace');

/**
 * options for htmlmin
 */
const htmlMinifierOptions = {
    collapseWhitespace: true,
    removeComments: true,
    caseSensitive: true,
    removeAttributeQuotes: false
};

/**
 * default build task
 */
task('build', sequenceTask(
    'clean',
    'build:aot',
    'build:assets',
    'build:inline-assets',
    'build:bundle',
    'build:uglify',
    'build:package'
));

/**
 * using ngc for component AOT compile
 */
task('build:aot', () => {
    const ngcPath = resolve('./node_modules/.bin/ngc');
    spawnSync(ngcPath, ['-p', config.tsconfigPath]);
});

/**
 * replace aot-compiled component's templateUrl to template, and styleUrls to styles
 */
task('build:inline-assets', () => {
    inlineAssetForDirectory(config.dist);
});

/**
 * process static assets, including html、less(css)、font and so on
 */
task('build:assets', sequenceTask([
    'build:minify:html',
    'build:copy:assetless',
    'build:copy:font',
    'build:copy:componentless',
    'build:compile:less',
], 'build:less:replacepath'));

/**
 * minify component html and copy them to the dist folder
 */
task('build:minify:html', () => {
    return src(join(config.componentPath, '**/*.html'))
        .pipe(htmlmin(htmlMinifierOptions))
        .pipe(dest(config.dist));
});

/**
 * copy asset less files to dist asset folder
 */
task('build:copy:assetless', copyTask(
    join(config.componentPath, '../asset/**/*.less'),
    join(config.dist, 'asset')
));

/**
 * copy component less files to dist component folder
 */
task('build:copy:componentless', copyTask(
    join(config.componentPath, '**/*.less'),
    join(config.dist, 'asset/less/component')
));

/**
 * fix some relative urls problem
 */
task('build:less:replacepath', (cb?: Function) => {

    // replace relative urls in component.less
    const componentLessFile = join(config.componentPath, '../asset/less/component.less');
    let content = readFileSync(componentLessFile, 'utf-8');
    content = content.replace(/\.\.\/\.\./g, '.');
    writeFileSync(join(config.dist, 'asset/less/component.less'), content, 'utf-8');

    // replace some font relative urls in built theme css files
    glob(join(config.dist, 'asset/css/theme/**/index.css')).forEach(filePath => {
        let cssContent = readFileSync(filePath, 'utf-8');
        cssContent = cssContent.replace(/theme\/font/g, '../../../font');
        writeFileSync(filePath, cssContent, 'utf-8');
    });

    if (cb) {
        cb();
    }
});

/**
 * copy fonts from src to dist
 */
task('build:copy:font', copyTask(
    join(config.componentPath, '../asset/font/**'),
    join(config.dist, 'asset/font')
));

/**
 * using gulp-less to compile less files to dist asset/css folder
 */
task('build:compile:less', () => {
    return src(join(config.componentPath, '../asset/less/**/*.less'))
        .pipe(less({
            plugins: [autoprefixPlugin]
        }))
        .pipe(gulpCleanCss())
        .pipe(dest(join(config.dist, 'asset/css')));
});

/**
 * using rollup to generate an umd lib file, that can be used by System.js and Plunker
 */
task('build:bundle', async () => {
    const inputOptions = {
        context: 'this',
        input: config.entry,
        external: [
            '@angular/core',
            '@angular/common',
            '@angular/forms',
            '@angular/router',
            '@angular/http'
        ],
        plugins: [
            rollupNodeResolutionPlugin(),
            rollupCommonjsPlugin()
        ]
    };

    const outputOptions = {
        format: 'umd',
        moduleId: '',
        name: config.moduleName,
        globals: {
            '@angular/core': 'ng.core',
            '@angular/common': 'ng.common',
            '@angular/forms': 'ng.forms',
            '@angular/router': 'ng.router',
            '@angular/http': 'ng.http'
        },
        file: join(config.umdPath, `${config.moduleName}.umd.js`),
        banner: `/** Copyright (c) BAIDU INC. */`,
        sourcemap: true
    };

    const bundle = await rollup.rollup(inputOptions);
    const { code, map } = await bundle.generate(outputOptions);

    await bundle.write(outputOptions);
});

/**
 * using uglify-js to minify umd lib file
 */
task('build:uglify', (cb?: Function) => {
    const uglifyPath = resolve('./node_modules/.bin/uglifyjs');
    const umdFile = join(config.umdPath, `${config.moduleName}.umd.js`);
    const umdMiniFile = join(config.umdPath, `${config.moduleName}.umd.min.js`);
    const childProcess = spawnSync(uglifyPath, ['-c', '-m', '--source-map', '-o', umdMiniFile, '--', umdFile]);

    if (cb) {
        cb();
    }
});
