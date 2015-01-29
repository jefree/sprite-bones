var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var webserver = require('gulp-webserver');

gulp.task('build', function() {
  gulp.src(['./src/dragonBones.js', './src/phaser_dragonbones.js', './src/sprite_bones.js'])
    .pipe(concat('sprite_bones.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('default', function() {

  gulp.watch('src/**/*.js', ['build']);

  gulp
    .src('./')
    .pipe(webserver({
      port:8080
    }));
});