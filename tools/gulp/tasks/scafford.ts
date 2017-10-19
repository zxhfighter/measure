import {src, task, dest} from 'gulp';
import {join} from 'path';
import {readFileSync, writeFileSync} from 'fs';

import {sequenceTask} from '../utils/sequence-task';
import {config} from '../utils/config';

const template = require('gulp-template');
const rename = require('gulp-rename');
const yargs = require('yargs');

// gulp generate:component --name your-button
task('generate:component', sequenceTask('generate:component:copy', 'generate:component:update'));

task('generate:component:copy', () => {

    const componentPath = config.componentPath;
    const name = yargs.argv.name;
    const destPath = join(componentPath, name);
    const tpl = config.scaffordPath;

    return src(tpl)
        .pipe(template({
            name,
            upperName: captilizeName(name)
        }))
        .pipe(rename((path: any) => {
            path.basename = path.basename.replace('temp', name);
        }))
        .pipe(dest(destPath));
});

task('generate:component:update', () => {
    const name = yargs.argv.name;
    const entry = join(config.componentPath, 'index.ts');

    let indexContent = readFileSync(entry, 'utf-8');
    indexContent += `export * from './${name}/index';`;
    indexContent += '\n';

    writeFileSync(entry, indexContent, 'utf-8');
});

function captilizeName(name: string) {
    return name
        .split('-')
        .map(item => item.charAt(0).toUpperCase() + item.slice(1))
        .join('');
}
