/**
 * NOT DONE YET
 */

import { task } from 'gulp';
import { execNodeTask } from '../utils/task_helpers';

function runKarmaTask() {
    return execNodeTask('karma', ['start', 'karma.conf.js']);
}

task('test', runKarmaTask());
