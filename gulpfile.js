var gulp = require('gulp');

// Tasks
gulp.task('lint', require('./gulp/eslint'));
gulp.task('stylus', require('./gulp/stylus'));
gulp.task('mocha', require('./gulp/mocha'));

gulp.task('analyze', ['lint']);
gulp.task('test', ['mocha']);

gulp.task('watch', ['stylus'], function() {
    gulp.watch('./src/stylus/**/*.styl', ['stylus']);
});