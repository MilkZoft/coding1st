var gulp = require('gulp');
var remoteSrc = require('gulp-remote-src');

module.exports = function() {
    gulp.task('vendo', function() {
        remoteSrc(['en.json', 'es.json'], {
            base: 'http://local.coding1st.com/vendomatic/'
        })
        .pipe(gulp.dest('./src/content/i18n/'));
    });
};
