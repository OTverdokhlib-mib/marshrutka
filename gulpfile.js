const gulp = require('gulp'),
	sass = require('gulp-sass'),
	watch = require('gulp-watch'),
	browserSync = require('browser-sync').create();

gulp.task('sass', function(done) {
    gulp.src("./app/sass/main.scss")
        .pipe(sass())
        .pipe(gulp.dest("./app/css/"))
        .pipe(browserSync.stream());


    done();
});

gulp.task('serve', function(done) {

    browserSync.init({
        server: "./app/"
    });

    watch("./app/sass/*.scss", gulp.series('sass'));
    watch(['./app/**/*.html', './app/**/*.js', './app/img/*.*']).on('change', () => {
      browserSync.reload();
      done();
    });
  

    done();
});

gulp.task('default', gulp.series('sass', 'serve'));