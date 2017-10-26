import {src, task, dest} from 'gulp';
import {join} from 'path';
import {readFileSync, writeFileSync} from 'fs';
import * as chalk from 'chalk';

import {sequenceTask} from '../utils/sequence-task';
import {config} from '../utils/config';

const template = require('gulp-template');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const yargs = require('yargs');
const dom = require('gulp-dom');
const yellow = chalk.default.yellow;

// gulp generate:component --name your-button
task('generate:component', sequenceTask(
    'generate:component:copy',
    'generate:component:update',
    'generate:demo',
    ':demo:update:html'
));

task('generate:component:copy', copyAndReplace(config.scaffordPath, config.componentPath));

task('generate:component:update', () => {
    const name = yargs.argv.name;
    const entry = join(config.componentPath, 'index.ts');

    let indexContent = readFileSync(entry, 'utf-8');
    indexContent += `export * from './${name}/index';`;
    indexContent += '\n';

    writeFileSync(entry, indexContent, 'utf-8');
});

task('generate:demo', copyAndReplace(config.scaffordDemoPath, config.demoPath));

task(':demo:update:html', () => {
    const name = yargs.argv.name;
    const appHtml = join(config.demoPath, 'app.component.html');

    console.log(`生成完毕后，您还需要更新
        ${yellow('src/demo/app.module.ts')}
        和 ${yellow('src/demo/app.router.ts')}`
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
        .pipe(replace('routerLink=', '[routerLink]='))
        .pipe(dest(config.demoPath));
});

// there are no ts -> ast -> ts
task(':demo:update:warn', () => {

});

task(':demo:update:router', () => {

});

function copyAndReplace(scaffordPath: string, destPath: string) {

    return () => {
        const name = yargs.argv.name;
        const destDir = join(destPath, name);

        return src(scaffordPath)
            .pipe(template({
                name,
                upperName: captilizeName(name)
            }))
            .pipe(rename((path: any) => {
                path.basename = path.basename.replace('temp', name);
            }))
            .pipe(dest(destDir));
    }
}

function captilizeName(name: string) {
    return name
        .split('-')
        .map(item => item.charAt(0).toUpperCase() + item.slice(1))
        .join('');
}
