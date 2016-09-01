//sample
var gulp        = require('gulp');
var browsync = require('browser-sync').create();
//var sass        = require('gulp-sass');
var $    = require('gulp-load-plugins')();

// Paths
var sassPaths = [
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browsync.init({
        server: "./"
    });

    gulp.watch("./scss/*.scss", ['sass']);
    gulp.watch("./**/*.html").on('change', browsync.reload);
	gulp.watch("./css/*.css").on('change', browsync.reload);
});

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

gulp.task('default', ['serve']);