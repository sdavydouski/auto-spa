var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    livereload = require('gulp-livereload'),
    plumber = require('gulp-plumber'),
    minifyCSS = require('gulp-minify-css');


gulp.task('js', function() {
    gulp.src('./js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./build/js'));
});


gulp.task('js-libs', function() {
    gulp.src('./public/libs/**/*.js')
        .pipe(gulp.dest('./build/public/libs'));
});


gulp.task('styles', function() {
    gulp.src('./sass/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(minifyCSS({keepBreaks:true}))
        .pipe(gulp.dest('./build/css'))
        .pipe(livereload());
});


gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('./js/**/*.js', ['js']);
    gulp.watch('./sass/*.scss', ['styles']);
});


gulp.task('default', ['js-libs', 'js', 'styles', 'watch']);