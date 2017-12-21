import { task, src, dest } from 'gulp';
import { sequenceTask } from '../utils/sequence-task';

const bump = require('gulp-bump');
const gutil = require('gulp-util');
const git = require('gulp-git');

task('commit', sequenceTask(
    'lint',
    'bump-version',
    // 'changelog',
    // 'commit-changes',
    // 'push-changes',
    // 'create-new-tag',
    // 'github-release'
));

task('bump-version', () => {
    return src('./package.json')
        .pipe(bump({type: 'patch'})).on('error', gutil.log)
        .pipe(dest('./'));
});

