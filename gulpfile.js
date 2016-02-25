var gulp = require('gulp');

// Imported Tasks
gulp.task('lint', require('./gulp/eslint'));
gulp.task('stylus', require('./gulp/stylus'));
//gulp.task('mocha', require('./gulp/mocha'));
gulp.task('vendo', require('./gulp/vendo'));

// Tasks
gulp.task('analyze', ['lint']);
//gulp.task('test', ['mocha']);

// Watch
gulp.task('watch', ['stylus'], function() {
    gulp.watch('./src/stylus/**/*.styl', ['stylus']);
});
