var gulp = require('gulp');
var mocha = require('gulp-mocha');

module.exports = function() {
    gulp.task('mocha', function() {
        return gulp.src(['test/**/*.js']).pipe(mocha());
    });
};
