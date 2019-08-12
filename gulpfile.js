const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');


gulp.task('funcionarios', function(){
    gulp.src('src/assets/department.scss')
    .pipe(sass().on('error',sass.logError))
    .pipe(concat('department.component.css'))
    .pipe(gulp.dest('src/app/department'));
})

gulp.task('sabores', function(){
    gulp.src('src/assets/product.scss')
    .pipe(sass().on('error',sass.logError))
    .pipe(concat('product.component.css'))
    .pipe(gulp.dest('src/app/product'));
})

gulp.task('main', function(){
    gulp.src('src/assets/app.scss')
    .pipe(sass().on('error',sass.logError))
    .pipe(concat('app.component.css'))
    .pipe(gulp.dest('src/app'));
})

gulp.task('sass:watch', function(){
    gulp.watch(['src/assets/department.scss'], ['funcionarios'])
    gulp.watch(['src/assets/product.scss'], ['sabores'])
    gulp.watch(['src/assets/app.scss'], ['main'])
});

gulp.task('default', gulp.parallel('sass:watch', 'funcionarios', 'sabores', 'main'));