var gulp = require('gulp');
var shell = require('gulp-shell');

module.exports = function() {
    gulp.task('docker-build', shell.task([
        'echo test'
    ]);
};
