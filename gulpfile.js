var gulp = require('gulp'),
    sass = require('gulp-sass'),
    livereload = require('gulp-livereload'),
    plumber = require('gulp-plumber'),
    minifyCSS = require('gulp-minify-css');


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
    gulp.watch('./sass/*.scss', ['styles']);
});


gulp.task('default', function() {
    console.log('Hello gulp!');
});
