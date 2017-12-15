import { task } from 'gulp';
import * as del from 'del';

task('clean', async () => {
    await del(['./dist', './aot']);
});
