var gulp = require('gulp'),
	gulp_files= require('gulp-files'),
	path = require('path'),
	less = require('gulp-less'),
	processWidget = require('./libs/processWidget'),
	processAll = require('./libs/processAll'),
	imagemin = require('gulp-imagemin'),
	pngquant= require('imagemin-pngquant'),
	cache= require('gulp-cache'),
	stacks = require('./libs/stack'),
	src = '../boardwalk/less/index.less',
	src1 = '../boardwalk/less/service.less', 
	src2 = '../boardwalk/less/company.less';



var files = [
	//css
	path.join('../boardwalk','less','*.css')
]



var start = function() {
	gulp.src(files).pipe(gulp_files(function(files) {
		for(var i=0; i<files.length; i++) {
			var _func = (function(index){
				return function() {
					process(files[index].path)
				}
				
			})(i)
			stack.push(_func);
		}
	}))
}

var process = function(src) {
	new processWidget(src);
}

gulp.task('testLess', function() {

	var stack = stacks('all', true)

	gulp.watch(files,function(file) {
		stack.push(function(){
			process(file.path);
		})
	})
})


module.exports = function() {
	start();
}
