import { task } from 'gulp';
import { execNodeTask } from '../utils/task_helpers';

function runKarmaTask(...args: string[]) {
    return execNodeTask('karma', ['start', 'karma.conf.js', ...args]);
}

task('test', runKarmaTask());
task('test:once', runKarmaTask('--single-run'));
