var gulp = require('gulp');
var shell = require('gulp-shell');

var build = 'echo \"Creating $dockerImage image...\"';
    build += 'docker build -t $dockerImage .';

// Imported Tasks
gulp.task('lint', require('./gulp/eslint'));
gulp.task('stylus', require('./gulp/stylus'));
gulp.task('mocha', require('./gulp/mocha'));

// Tasks
gulp.task('analyze', ['lint']);
gulp.task('test', ['mocha']);

// Docker tasks
gulp.task('docker-bash', shell.task([
    'cd docker && ./docker-bash.sh'
], { interactive: true }));

gulp.task('docker-build', shell.task([
    'cd docker && ./docker-build.sh'
], { interactive: true }));

gulp.task('docker-clean', shell.task([
    'cd docker && ./docker-clean.sh'
], { interactive: true }));

gulp.task('docker-run', shell.task([
    'cd docker && ./docker-run.sh'
], { interactive: true }));

gulp.task('docker-stop', shell.task([
    'cd docker && ./docker-stop.sh'
], { interactive: true }));

// Watch
gulp.task('watch', ['stylus'], function() {
    gulp.watch('./src/stylus/**/*.styl', ['stylus']);
});
