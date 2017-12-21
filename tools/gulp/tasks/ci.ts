import { task, src, dest } from 'gulp';
import { sequenceTask } from '../utils/sequence-task';
import { readFileSync } from 'fs';
import { join } from 'path';
import { config } from '../utils/config';

const bump = require('gulp-bump');
const gutil = require('gulp-util');
const git = require('gulp-git');

const conventionalChangelog = require('gulp-conventional-changelog');
const conventionalGithubReleaser = require('conventional-github-releaser');

const yargs = require('yargs');

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
    const commitMsg = yargs.argv.m;
    return src('.')
        .pipe(git.add())
        .pipe(git.commit(commitMsg || '【Prerelease】Bumped version number'));
});

task('push-changes', cb => {
    git.push('origin', branch, cb);
});

task('create-new-tag', cb => {
    const version = require(join(config.projectPath, 'package.json')).version;
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
        token: 'b5f2e69bfbafba2ac0fd66a9cf865ce4d0874fa5'
    }, {
        preset: 'angular'
    }, done);
});
