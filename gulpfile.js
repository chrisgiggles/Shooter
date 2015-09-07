var gulp = require('gulp'),
  connect = require('gulp-connect');

gulp.task('connect', function() {
  connect.server({
    root: '.',
    livereload: true
  });
});

gulp.task('js', function () {
  gulp.src('js/**/*.js')
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(['js/**/*.js'], ['js']);
});

gulp.task('default', ['connect', 'watch']);
