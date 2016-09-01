//tells Node to look into the node_modules folder for a package named gulp. Once the package is found, we assign its contents to the variable gulp. 
var gulp = require('gulp');
// Require Gulp-sass plugin
var sass = require('gulp-sass');
// Calling the BrowserSync
var browserSync = require('browser-sync').create();
// Calling Useref
var useref = require('gulp-useref');

/*Gulp Task Syntax.
gulp.task('task-name', function() {
	//Stuff to do
});
*/
gulp.task('greet', function(){
	console.log('Assalam alaikum tuan!');
});

gulp.task('sass', function(){
	return gulp.src('web/scss/**/*.scss') // ->'app/scss/**/*.scss' globbing pattern
	.pipe(sass({
		includePaths: [
		'./bower_components/foundation/scss'
	]
	}))
	.pipe(gulp.dest('web/css'))
	.pipe(browserSync.reload({
      stream: true
    }))
});

//Browser-sync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'web'
    },
  })
})

//Useref task
gulp.task('useref', function() {
	return gulp.src('web/*.html')
	.pipe(useref())
	.pipe(gulp.dest('dist'))
})


// // Gulp watch syntax - gulp.watch('files-to-watch', ['tasks', 'to', 'run']); 
gulp.task('watch', ['browserSync', 'sass'], function(){
	gulp.watch('web/scss/**/*.scss', ['sass']);
	// Reloads the browser whenever HTML or JS files change
  	gulp.watch('web/*.html', browserSync.reload); // this watch changes
  	gulp.watch('web/js/**/*.js', browserSync.reload); // this watch changes
});





