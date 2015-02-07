var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var livereload = require('gulp-livereload');
var LessPluginAutoPrefix = require('less-plugin-autoprefix');

var autoprefix = new LessPluginAutoPrefix({browsers: ["last 4 versions"]});
var bowerDirectory = "bower_components/";

var libStylesheets = [
  bowerDirectory + 'bootstrap/dist/css/bootstrap.css',
  bowerDirectory + 'fontawesome/css/font-awesome.css'
];
var libJavascripts = [];

gulp.task('lib-js', function() {
  gulp.src(libJavascripts)
    .pipe(concat('lib.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('lib-css', function() {
  gulp.src(libStylesheets)
    .pipe(concat('lib.css'))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('uglify-js', function() {
  gulp.src('dist/js/lib.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('minify-css', function() {
  gulp.src('dist/css/*.css')
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('browserify', function() {
  gulp.src('src/js/main.js')
    .pipe(browserify({transform: 'reactify'}))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(livereload());
});

gulp.task('copy-index', function() {
  gulp.src('src/index.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('copy-fonts', function() {
  gulp.src([
      'src/fonts/**/*.*',
      bowerDirectory + 'fontawesome/fonts/*.*'
    ])
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('copy-images', function() {
  gulp.src('src/img/**/*.*')
    .pipe(gulp.dest('dist/img'));
});

gulp.task('less', function() {
  gulp.src('src/css/app.less')
    .pipe(less({
      plugins: [autoprefix]
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(livereload());
});

gulp.task('default', ['lib-js', 'lib-css', 'browserify', 'copy-index', 'copy-fonts', 'copy-images', 'less']);
gulp.task('app', ['browserify', 'copy-index', 'copy-fonts', 'copy-images', 'less']);
gulp.task('build', ['uglify-js', 'minify-css']);

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('src/**/*.*', ['app']);
});