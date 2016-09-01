// Variables
//==========================
var gulp = require('gulp');
var $    = require('gulp-load-plugins')();
//var browsync = require('browser-sync').create();
var browserSync = require('browser-sync').create();

var sassPaths = [
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

// Tasks
//==========================


// Sass Task 
gulp.task('sass', function() {
  return gulp.src('scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths,
      outputStyle:  'nested'//'compact'//'nested'//'expanded' //'compressed' // if css compressed **file size**
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('css'));
});

//Browser-sync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './'
    },
  })
});


gulp.task('default', ['browserSync'], ['sass'], function() {
  gulp.watch(['scss/**/*.scss'], ['sass']);
});

