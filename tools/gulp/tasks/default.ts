import { task } from 'gulp';
import chalk from 'chalk';
import { sequenceTask } from '../utils/sequence-task';
const yellow = chalk.yellow;
const red = chalk.red;

task('default', sequenceTask('help'));

task('help', () => {
    const info = `
Try ${yellow('gulp serve')} or ${yellow('gulp build')}.

All available commands can be found ${red('package.json')}.
    `;

    console.log(info);
});
