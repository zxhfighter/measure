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

task('lint', sequenceTask('tslint', 'stylelint'));

task('stylelint', execNodeTask(
  'stylelint', [stylesGlob, '--config', '.stylelintrc', '--syntax', 'less']
));

task('tslint', execTsLintTask());

task('tslint:fix', execTsLintTask('--fix'));

function execTsLintTask(...flags: string[]) {
  const tslintBinPath = resolveBin.sync('tslint');
  const tsNodeOptions = ['-O', '{"module": "commonjs"}'];
  return execNodeTask('ts-node', [...tsNodeOptions, tslintBinPath, ...tsLintBaseFlags, ...flags]);
}
