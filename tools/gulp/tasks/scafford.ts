import { src, task, dest } from 'gulp';
import { join } from 'path';
import { readFileSync, writeFileSync } from 'fs';
import * as chalk from 'chalk';

import { sequenceTask } from '../utils/sequence-task';
import { config } from '../utils/config';

const template = require('gulp-template');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const yargs = require('yargs');
const dom = require('gulp-dom');
const yellow = chalk.default.yellow;

/**
 * quickly generate a component:
 *
 * gulp generate:component --name your-button
 */
task('generate:component', sequenceTask(
    'generate:component:copy',
    'generate:component:update',
    'generate:componentless:update',
    'generate:demo',
    ':demo:update:html'
));

/**
 * copy component template files and replace component name
 */
task('generate:component:copy', copyAndReplace(config.scaffordPath, config.componentPath));

/**
 * update component entry index.ts
 */
task('generate:component:update', () => {
    const name = yargs.argv.name;
    const entry = join(config.componentPath, 'index.ts');

    let indexContent = readFileSync(entry, 'utf-8');
    indexContent += `export * from './${name}/index';`;
    indexContent += '\n';

    writeFileSync(entry, indexContent, 'utf-8');
});

/**
 * update component less entry file
 */
task('generate:componentless:update', () => {
    const name = yargs.argv.name;
    const entry = join(config.componentPath, '../asset/less/component.less');

    let content = readFileSync(entry, 'utf-8');
    content += `@import "../../component/${name}/${name}.less";`;
    content += '\n';

    writeFileSync(entry, content, 'utf-8');
});

/**
 * copy demo template files and replace component name
 */
task('generate:demo', copyAndReplace(config.scaffordDemoPath, config.demoPath));

/**
 * update demo app root html
 */
task(':demo:update:html', () => {
    const name = yargs.argv.name;
    const appHtml = join(config.demoPath, 'app.component.html');

    console.log(`There more two step, modify the follwing files to run the demo：
        ${yellow('src/demo/app.module.ts')}
        ${yellow('src/demo/app.router.ts')}`
    );

    return src(appHtml)
        .pipe(dom(function () {
            const li = this
                .querySelector('.app-aside-list')
                .appendChild(this.createElement('li'));

            li.setAttribute('class', 'list-item');
            li.setAttribute('routerLinkActive', 'active');

            // 写成 [routerLink] 会报错，因此在下边用 gulp-replace 替换成 [routerLink]
            li.setAttribute('routerLink', `['/${name}']`);
            li.appendChild(this.createTextNode(name));

            return this;
        }))
        .pipe(replace('<html><head></head><body>', ''))
        .pipe(replace('</body></html>', ''))
        .pipe(replace('routerlinkactive', 'routerLinkActive'))
        .pipe(replace('routerlink=', '[routerLink]='))
        .pipe(replace('[routerlink]=', '[routerLink]='))
        .pipe(dest(config.demoPath));
});

/**
 *
 * copy files from sourcePath to destPath and replace placeholders
 *
 * @param {string} sourcePath - sources path
 * @param {string} destPath - dest path
 * @return {Function}
 */
function copyAndReplace(sourcePath: string, destPath: string) {

    return () => {
        const name = yargs.argv.name;
        const destDir = join(destPath, name);

        return src(sourcePath)
            .pipe(template({
                name,
                upperName: captilizeName(name)
            }))
            .pipe(rename((path: any) => {
                path.basename = path.basename.replace('temp', name);
            }))
            .pipe(dest(destDir));
    };
}

/**
 * convert kerba-type name to pascal-type name, i.e. combo-select to ComboSelect
 *
 * @param {string} name - origin var name
 * @return {string} pascal-type name
 */
function captilizeName(name: string) {
    return name
        .split('-')
        .map(item => item.charAt(0).toUpperCase() + item.slice(1))
        .join('');
}
