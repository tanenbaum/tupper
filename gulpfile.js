const gulp = require('gulp');
const del = require('del');

const pub = 'public';
// gh pages /docs on master
const dist = 'docs';

gulp.task('clean', () => del(`${dist}/**/*`));

gulp.task('dist', ['clean'], () => 
	gulp.src([`${pub}/*.html`, `${pub}/scripts/*.js`, `${pub}/css/*.css`, `${pub}/lib/**/*.min.js`], 
		{base: pub})
		.pipe(gulp.dest(dist))
);