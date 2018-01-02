import { task } from 'gulp';
import { config } from '../utils/config';
import { sequenceTask } from '../utils/sequence-task';
import { execNodeTask } from '../utils/task_helpers';
import { join } from 'path';
import chalk from 'chalk';

const red = chalk.red;
const madge = require('madge');
const resolveBin = require('resolve-bin');
const stylesGlob = '+(tools|src)/**/!(*.bundle).+(css|less)';
const tsLintBaseFlags = [
    '-c', 'tslint.json',
    '--project', './tsconfig.json',
    '-e', 'scafford'
];

task('lint', sequenceTask('tslint', 'stylelint'));

task('stylelint', execNodeTask(
    'stylelint', [stylesGlob, '--config', '.stylelintrc', '--syntax', 'less', '--fix']
));

task('tslint', execTsLintTask());

task('tslint:fix', execTsLintTask('--fix'));

function execTsLintTask(...flags: string[]) {
    const tslintBinPath = resolveBin.sync('tslint');
    const tsNodeOptions = ['-O', '{"module": "commonjs"}'];
    return execNodeTask('ts-node', [...tsNodeOptions, tslintBinPath, ...tsLintBaseFlags, ...flags]);
}

/** Task that runs madge to detect circular dependencies. */
task('madge', () => {
    madge([config.dist]).then((res: any) => {
        const circularModules = res.circular();

        if (circularModules.length) {
            console.error();
            console.error(red(`Madge found modules with circular dependencies.`));
            console.error(formatMadgeCircularModules(circularModules));
            console.error();
        }
    });
});

/** Returns a string that formats the graph of circular modules. */
function formatMadgeCircularModules(circularModules: string[][]): string {
    return circularModules.map((modulePaths: string[]) => `\n - ${modulePaths.join(' > ')}`).join('');
}
