var gulp = require('gulp');
var remoteSrc = require('gulp-remote-src');
var jsonFormat = require('gulp-json-format');

module.exports = function() {
    gulp.task('vendo', function() {
        remoteSrc(['en.json', 'es.json'], {
            base: 'http://local.coding1st.com/vendomatic/'
        })
        .pipe(jsonFormat(4))
        .pipe(gulp.dest('./src/content/i18n/'));
    });
};
