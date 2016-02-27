var gulp = require('gulp');
var stylus = require('gulp-stylus');

module.exports = function() {
    gulp.task('stylus', function() {
        gulp.src('./src/stylus/style.styl')
            .pipe(stylus({
                force: true,
                compress: true
            }))
            .pipe(gulp.dest('./src/public/css/'));
        gulp.src('./src/stylus/dashboard/style.styl')
            .pipe(stylus({
                force: true,
                compress: true
            }))
            .pipe(gulp.dest('./src/public/css/dashboard'));
    });
};
