var gulp = require('gulp'),
  sass = require('gulp-sass'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  imagemin = require('gulp-imagemin'),
  htmlmin = require('gulp-htmlmin'),
  gls = require('gulp-live-server'),
  jshint = require('gulp-jshint'),
  stylish = require('jshint-stylish');

gulp.task('default', ['sass', 'js', 'image', 'htmlmin', 'watch', 'serve']);

gulp.task('sass', function() {
  return gulp.src('assets/src/sass/**/*.scss')
    .pipe(concat('style.min.css'))
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(gulp.dest('assets/css'));
});

gulp.task('js', function() {
  return gulp.src('assets/src/js/**/*.js')
    .pipe(concat('script.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js'));
});

gulp.task('image', function() {
  return gulp.src('assets/src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('assets/img'))
});

gulp.task('htmlmin', function(){
  return gulp.src('_html/*.html')
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest('.'));
});

gulp.task('watch', function(){
  gulp.watch('assets/src/sass/**/*.scss',['sass']);
  gulp.watch('assets/src/js/**/*.js',['js']);
  gulp.watch('assets/src/img/*',['image']);
  gulp.watch('_html/*.html',['htmlmin']);
});

gulp.task('serve', function(){
  var server = gls.static('./', 8000);
  server.start();
  gulp.watch('assets/css/**/*.css', function(file){
    server.notify.apply(server, [file]);
  });
  gulp.watch('assets/js/**/*.js', function(file){
    server.notify.apply(server, [file]);
  });
  gulp.watch('assets/img/*', function(file){
    server.notify.apply(server, [file]);
  });
  gulp.watch('./*.html', function(file){
    server.notify.apply(server, [file]);
  });
});

gulp.task('lint', function() {
  return gulp.src('assets/src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});
