import { task } from 'gulp';
import { config } from '../utils/config';
import { sequenceTask } from '../utils/sequence-task';
import { execNodeTask } from '../utils/task_helpers';
import { join } from 'path';
import chalk from 'chalk';

const madge = require('madge');
const resolveBin = require('resolve-bin');
const stylesGlob = '+(tools|src)/**/!(*.bundle).+(css|less)';
const tsLintBaseFlags = [
  '-c', 'tslint.json',
  '--project', './tsconfig.json',
  '-e', 'scafford'
];

task('lint', sequenceTask('tslint', 'stylelint', 'madge'));

task('stylelint', execNodeTask(
  'stylelint', [stylesGlob, '--config', '.stylelintrc', '--syntax', 'less']
));

task('tslint', execTsLintTask());

task('tslint:fix', execTsLintTask('--fix'));

task('madge', sequenceTask('clean', 'build', ':madge'));

/**
 * 循环依赖检测
 * TODO 目前build环节会出问题，待问题解决后再检验
 *
 */
task(':madge', () => {
  madge(config.dist).then((res: any) => {
    const circularModules = res.circular();
    if (circularModules.length) {
      console.error();
      console.error(chalk.red(`Madge found modules with circular dependencies.`));
      console.error(formatMadgeCircularModules(circularModules));
      console.error();
    }
  });
});

function formatMadgeCircularModules(circularModules: string[][]): string {
  return circularModules.map((modulePaths: string[]) => `\n - ${modulePaths.join(' > ')}`).join('');
}

function execTsLintTask(...flags: string[]) {
  const tslintBinPath = resolveBin.sync('tslint');
  const tsNodeOptions = ['-O', '{"module": "commonjs"}'];
  return execNodeTask('ts-node', [...tsNodeOptions, tslintBinPath, ...tsLintBaseFlags, ...flags]);
}

