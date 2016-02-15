var fs = require('fs');
var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var plugins = require('gulp-load-plugins')();
var packageInfo = require('./package.json');

var config = {
	input: {
		test: [
			'./src/reset.scss'
		],
		build: [
			'./src/reset.scss'
		]
	},
	output: {
		sass: "./dist/sass",
		css: "././dist/css"
	}
};

var sassOptions = {
	errLogToConsole: true,
	outputStyle: 'expanded'
};

var autoprefixerOptions = {
	browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

gulp.task('test', function () {
	return gulp
		.src(config.input.test)
		.pipe(sass(sassOptions).on('error', sass.logError))
		.pipe(autoprefixer(autoprefixerOptions))
		.pipe(gulp.dest(config.output.css))
		.resume();
});

gulp.task('build', function () {
	return gulp
		.src(config.input.build)
		.pipe(plugins.concat('sass-reset.scss'))
		.pipe(plugins.header(fs.readFileSync('./banner.txt', 'utf8')))
		.pipe(plugins.header('@charset \'UTF-8\';\n\n'))
		.pipe(plugins.replace(/@version@/, packageInfo.version))
		.pipe(gulp.dest(config.output.sass));
});
