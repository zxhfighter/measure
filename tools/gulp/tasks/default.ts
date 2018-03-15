import { task } from 'gulp';
import chalk from 'chalk';

const { yellow, red } = chalk;

task('default', ['help']);

task('help', () => {
    console.log();
    console.log(`Try ${yellow('gulp serve')} or ${yellow('gulp build')}.`);
    console.log(`All available commands can be found in ${red('package.json')}.`);
    console.log();
});
