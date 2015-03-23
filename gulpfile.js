var gulp = require('gulp'),
    fs = require('fs'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    livereload = require('gulp-livereload'),
    plumber = require('gulp-plumber'),
    minifyCSS = require('gulp-minify-css'),
    replace = require('gulp-replace'),
    rename = require("gulp-rename");


gulp.task('js', function() {
    gulp.src('./js/**/*.js')
        //.pipe(uglify())
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


gulp.task('index.dev.html', function(cb) {
    return gulp.src('./index.dev.html')
                .pipe(rename('index.html'))
                .pipe(gulp.dest('./'), cb);
});


gulp.task('templates', ['index.dev.html'], function(cb) {
    return gulp.src('./index.dev.html')
                .pipe(replace(/<!-- templates... -->/, function() {
                    var templates = '';
                    var files = fs.readdirSync('./templates');
                    files.forEach(function(file) {
                        templates += fs.readFileSync('./templates/' + file, 'utf-8');
                    })

                    return templates;
                }))
                .pipe(rename('index.html'))
                .pipe(gulp.dest('./'), cb);
});


gulp.task('index.html', ['templates'], function() {
    return gulp.src('./index.html')
                .pipe(livereload());
});

//TODO: https://www.npmjs.com/package/gulp-watch
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('./js/**/*.js', ['js']);
    gulp.watch('./sass/*.scss', ['styles']);
    gulp.watch('./templates/*.html', ['index.html']);
    gulp.watch('./index.dev.html', ['index.html']);
});


gulp.task('default', ['public', 'js', 'styles', 'index.html', 'watch']);
