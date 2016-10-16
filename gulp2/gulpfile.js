var gulp=require('gulp');
var htmlmin=require('gulp-htmlmin');
var uglify=require('gulp-uglify');
var cssmin=require('gulp-cssmin');
var imagemin=require('gulp-imagemin');
var concat=require('gulp-concat');

gulp.task('uglify:css',function(){
	gulp.src('src/css/*.css')
	 .pipe(cssmin())
	.pipe(concat('main.min.css'))
	.pipe(gulp.dest('build/css'));
});
gulp.task('uglify:js',function(){
	gulp.src('src/js/*.js')
	.pipe(uglify())
	.pipe(concat('main.min.js'))
	.pipe(gulp.dest('build/js'));
});
gulp.task('uglify:img',function(){
	gulp.src('src/img/*.png')
	.pipe(imagemin())
	.pipe(gulp.dest('build/img'));
});
gulp.task('uglify:html',function(){
	gulp.src('src/index.html')
	.pipe(htmlmin({collapseWhitespace: true}))
	.pipe(gulp.dest('build'));
});
gulp.watch('src/index.html',['uglify:html']);
gulp.task('default',['uglify:css','uglify:html','uglify:img','uglify:js']);