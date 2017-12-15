import { join } from 'path';
import { src, task, dest } from 'gulp';
import { spawnSync } from 'child_process';
import { sequenceTask } from '../utils/sequence-task';

import { config } from '../utils/config';

task('build:package', sequenceTask('copy-package', 'copy-readme'));

task('copy-package', () => {
    const packageFilePath = join(config.componentPath, '../../package.json');
    return src(packageFilePath).pipe(dest(config.dist));
});

task('copy-readme', () => {
    const readmeFilePath = join(config.componentPath, '../../README.md');
    return src(readmeFilePath).pipe(dest(config.dist));
});

task('gzip', (cb?: Function) => {
    spawnSync('cd', [config.dist]);
    spawnSync('tar', ['-czf', 'xdesign.tar.gz', '*']);
    if (cb) {
        cb();
    }
});
