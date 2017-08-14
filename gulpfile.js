const gulp = require('gulp');
const less = require('gulp-less');
const rename = require('gulp-rename');
const del = require('del');
const path = require('path');
const LessAutoprefix = require('less-plugin-autoprefix');
const autoprefix = new LessAutoprefix({browsers: ['last 2 versions']});
const LessPluginCleanCSS = require('less-plugin-clean-css');
const cleanCSSPlugin = new LessPluginCleanCSS({advanced: true});

const resolve = p => {
    return path.resolve(__dirname, p);
};

const dist = resolve('asset/style');

gulp.task('build-less', () => {
    const source = gulp.src(resolve('src/asset/less/component.less'));

    return source.pipe(less({plugins: [autoprefix]}))
        .pipe(rename('measure.css'))
        .pipe(gulp.dest(dist));
});

gulp.task('build-less-prod', () => {
    const source = gulp.src(resolve('src/asset/less/component.less'));

    return source.pipe(less({plugins: [autoprefix, cleanCSSPlugin]}))
        .pipe(rename('measure.min.css'))
        .pipe(gulp.dest(dist));
});

gulp.task('build-theme', ['clean'], () => {
    gulp.src(['src/asset/less/theme/**/*.less'], {base: './'})
        .pipe(less({plugins: [autoprefix]}))
        .pipe(gulp.dest(file => file.base));
});

gulp.task('copy-less', () => {
    return gulp.src(resolve('src/asset/less/**/*')).pipe(gulp.dest(dist));
});

gulp.task('clean', cb => {
    del([resolve('asset')]).then(paths => {
        cb();
    });
});

gulp.task('default', ['build-theme', 'build-less', 'build-less-prod', 'copy-less']);
