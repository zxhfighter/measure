import { task } from 'gulp';
import * as del from 'del';

task('clean', () => del(['./dist', './aot']));
