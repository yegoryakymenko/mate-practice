const
  gulp                = require('gulp'),
  nunjucksRender      = require('gulp-nunjucks-render'),
  sass 				        = require('gulp-sass'),
  watch 			        = require('gulp-watch'),
  cleanCSS 			      = require('gulp-clean-css'),
  autoprefixer 	  	  = require('gulp-autoprefixer');

const htmlMain = gulp.task('html', () =>
  gulp.src("src/core/index.html")
    .pipe(nunjucksRender())
    .pipe(gulp.dest("./dist"))
);

gulp.task('sass', function () {
  return gulp.src('src/core/scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('minify-css', function()  {
  return gulp.src('dist/main.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist'));
});

gulp.task('autoprefixer', () =>
    gulp.src('dist/css/main.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist'))
);

gulp.task('default',['html','sass'], function () {
    gulp.watch('./src/**/*.scss', ['sass']);
    gulp.watch("./src/**/*.html", ['html']);
});