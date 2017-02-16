
var gulp = require('gulp'),
	less = require('gulp-less'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),//图片压缩
	pngcrush = require('imagemin-pngcrush'),
	htmlHelper = require('gulp-html-extend');

var dir = '../event/';


gulp.task('testLess', function() {
	gulp.src(dir+'web/*/*/*.less')
		.pipe(less())
		.pipe(gulp.dest(dir+'output'));
	console.log('done css');
})

gulp.task('minify-js', function() {
	gulp.src(dir+'web/*/*/*.js')
		//.pipe(uglify())
		.pipe(gulp.dest(dir+'output'));
})

gulp.task('img', function() {
  return gulp.src(dir+'web/*/images/*')
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
		use: [pngcrush()]
    }))
	.pipe(gulp.dest(dir+'output'));
});

gulp.task('testHtml', function() {
	gulp.src(dir+'web/*/*.html').pipe(htmlHelper({
		annotations:false,verbose:false
	})).pipe(gulp.dest(dir+'output'))
})


gulp.task('default', function() {
	gulp.run('testLess','minify-js','testHtml','img');
	gulp.watch(dir+'web/*/*/*.less',['testLess'])
	gulp.watch(dir+'web/*/*/*.js',['minify-js'])
	gulp.watch(dir+'web/*/*.html',['testHtml'])
	gulp.watch(dir+'web/*/images/*',['img'])
})

