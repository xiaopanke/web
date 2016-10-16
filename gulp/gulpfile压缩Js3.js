var gulp=require('gulp'); //引入模块
var uglify=require('gulp-uglify');
var pump=require('pump');
gulp.task('yasuo',function(cb){ //编写任务
	pump([
		gulp.src('src/b.js'),
		uglify(),
		gulp.dest('dest')
	],cb)
});