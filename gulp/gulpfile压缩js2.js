var gulp=require('gulp'); //引入模块
var uglify=require('gulp-uglify');
gulp.task('yasuo',function(){ //编写任务
	gulp.src('src/a.js')
	.uglify()
	.gulp.dest('dest');
});