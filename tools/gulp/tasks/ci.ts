import { task, src, dest } from 'gulp';
import { sequenceTask } from '../utils/sequence-task';
import { readFileSync } from 'fs';

const bump = require('gulp-bump');
const gutil = require('gulp-util');
const git = require('gulp-git');

const conventionalChangelog = require('gulp-conventional-changelog');
const conventionalGithubReleaser = require('conventional-github-releaser');

const branch = 'develop';

task('commit', sequenceTask(
    'lint',
    // 'build',
    'bump-version',
    'changelog',
    'commit-changes',
    'push-changes',
    'create-new-tag',
    'github-release'
));

task('bump-version', () => {
    return src('./package.json')
        .pipe(bump({type: 'patch'})).on('error', gutil.log)
        .pipe(dest('./'));
});

task('changelog', () => {
    return src('./CHANGELOG.md', {
            buffer: false
        })
        .pipe(conventionalChangelog({
            preset: 'angular'
        }))
        .pipe(dest('./'));
});

task('commit-changes', () => {
    return src('.')
        .pipe(git.add())
        .pipe(git.commit('【Prerelease】Bumped version number'));
});

task('push-changes', cb => {
    git.push('origin', branch, cb);
});

task('create-new-tag', cb => {
    const version = require('./package.json').version;
    git.tag(version, 'Created Tag for version: ' + version, (error: any) => {
        if (error) {
            cb(error);
        }
        git.push('origin', branch, {args: '--tags'}, cb);
    });
});

task('github-release', done => {
    conventionalGithubReleaser({
        type: 'oauth',
        token: 'ad223a9a4f899466e3a4d1e447e591140594d695'
    }, {
        preset: 'angular'
    }, done);
});
