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


gulp.task('public', function() {
    gulp.src('./public/**')
        .pipe(gulp.dest('./build/public'));
});


gulp.task('styles', function() {
    gulp.src('./sass/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(minifyCSS({keepBreaks:true}))
        .pipe(gulp.dest('./build/css'))
        .pipe(livereload());
});

gulp.task('html', function() {
    gulp.src('./index.html')
        .pipe(livereload());
});


gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('./js/**/*.js', ['js']);
    gulp.watch('./sass/*.scss', ['styles']);
    gulp.watch('./index.html', ['html']);
});


gulp.task('default', ['public', 'js', 'styles', 'html', 'watch']);
