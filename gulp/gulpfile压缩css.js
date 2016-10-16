var gulp=require('gulp'); //引入模块
var uglify=require('gulp-uglify');
var cssmin=require('gulp-mini-css');

var pump=require('pump');
gulp.task('uglify:js',function(cb){ //编写任务
	pump([
		gulp.src('src/b.js'),
		uglify(),
		gulp.dest('dest')
	],cb)
});
gulp.task('uglify:css',function(){ //编写任务
	gulp.src('src/a.css')
	.pipe(cssmin())
	.pipe(gulp.dest('dest'));
});
gulp.task('default',['uglify:js','uglify:css']);