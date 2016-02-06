var gulp = require('gulp');
var mocha = require('gulp-mocha');
var babel = require('babel-core/register');

module.exports = function() {
    gulp.task('mocha', function() {
        return gulp.src(['test/**/*.js'])
            .pipe(mocha({
                compilers: {
                    js: babel
                }
            }));
    });
};