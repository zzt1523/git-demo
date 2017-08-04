// 1.LESS编译 压缩 合拼
// 2.JS合并 压缩 混淆
// 3.Img复制
// 4.html压缩
//在gulpfile中先载入gulp包。这个包提供了一些API

// 1.LESS编译 压缩 --合拼--
var gulp = require('gulp');
var less = require('gulp-less');
var cssnano =require('gulp-cssnano');

// var reload=browserSync.reload;
gulp.task('style',function(){
	//这里是在执行style任务时自动执行的
	gulp.src(['src/css/*.less','!src/css/_*.less']) //获取
	.pipe(less()) //编译less
	.pipe(cssnano()) //压缩
	.pipe(gulp.dest('dist/style')) //输出
	.pipe(browserSync.reload({
		stream:true
	}));
});
// 2.JS合并 压缩 混淆
var concat =require('gulp-concat');
var uglify=require('gulp-uglify');

gulp.task('script',function(){
	gulp.src('src/js/*.js') //获取
	.pipe(concat('all.js')) //合并
	.pipe(uglify())
	.pipe(gulp.dest('dist/script'))  //输出
	.pipe(browserSync.reload({
		stream:true
	}));

});
// 3.Img复制
gulp.task('images',function(){
	gulp.src('src/images/*.*')
	.pipe(gulp.dest('dist/images'))
	.pipe(browserSync.reload({
		stream:true
	}));

});
// 4.html压缩 
// removeAttributeQuotes 删除html中的 “ 号
// removeScriptTypeAttributes 移除js引入代码中type
var htmlmin=require('gulp-htmlmin');
gulp.task('html',function(){
	gulp.src('src/*.html')
	.pipe(htmlmin({
		collapseWhitespace: true, //压缩Html代码
		removeComments:true //删除注释
	}))
	.pipe(gulp.dest('dist'))
	.pipe(browserSync.reload({
		stream:true
	}));
});
// 自动监听
var browserSync=require('browser-sync');
gulp.task('serve',function(){
	browserSync({
		server: {
			baseDir:['dist/']
		},
	 }, function(err, bs) {
	    console.log(bs.options.getIn(["urls","local"]));
	});

gulp.watch('src/css/*.less',['style']);
gulp.watch('src/js/*.js',['script']);
gulp.watch('src/*.html',['html']);
gulp.watch('src/images/*.*',['images']);

});