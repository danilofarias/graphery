'use strict';

import gulp             from 'gulp';
import gutil            from 'gulp-util';
import sass             from 'gulp-sass';
import autoprefixer     from 'gulp-autoprefixer';
import sourcemaps       from 'gulp-sourcemaps';
import imagemin         from 'gulp-imagemin';
import minify           from 'gulp-minify-css';
import uglify           from 'gulp-uglify'
import babel            from 'gulp-babel';


// Sass
gulp.task('sass', () => {
  return gulp.src('./src/scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./public/css'));
});


// Images
gulp.task('images', (tmp) => {
    gulp.src(['src/images/*.jpg', 'src/images/*.png'])
        .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
        .pipe(gulp.dest('./public/images'));
});


// Javascripts
gulp.task('scripts', () => {
    gulp.src(['src/js/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(babel())
        .on('error', gutil.log)
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./public/js'))
});


// Watchmen
gulp.task('watchmen', () => {
    gulp.watch('./src/scss/**', ['sass']);
    gulp.watch('./src/js/**', ['scripts']);
    gulp.watch('./src/images/**', ['images']);
});

// Main task
gulp.task('default', () => {
    console.log('Graphery o--O--o');
});