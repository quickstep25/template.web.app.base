/**
 *		Using the "gulp" command in NodeJS will pull in a source file and pass through a designated plugin module and output the processed code in the destination location.
 *		IMPORTANT! It is not recommended to run individual gulp tasks in this scrip from the command line.  Safest route is to let the watcher handle what needs to be cleaned and updated.
 *		If there is geniune need for running individual tasks, choose tasks that wrap other tasks because dependencies are identified in the wrapper tasks as well as in the watcher task.
 *		For example, 'build_html' or 'build_css'.
 *
 *		Clean up of directories and files is only done for an entire site build-out, when "npm install" or "gulp" command is executed.  This prevents any issues from interferring with gulp.watch
 *
 *		@task {string} - user defined name for task
 */
/*global console, require, process*/
(function () {
	"use strict";
	// NODE MODULE VARIABLES
	var fs		= require('fs'),
		vm		= require('vm'),
		clean	= require('del'),
		chalk	= require('chalk'),
		merge	= require('deeply'),
		// GULP MODULE VARIABLES
		gulp	= require('gulp'),
		jade	= require('gulp-jade'),
		filter	= require('gulp-filter'),
		rename	= require('gulp-rename'),
		util	= require('gulp-util'),
		ugly	= require('gulp-uglify'),
		less	= require('gulp-less'),
		image	= require('gulp-imagemin'),
		md		= require('gulp-markdown'),
		css		= require('gulp-minify-css'),
		rehtml	= require('gulp-html-replace'),
		rjs		= require('gulp-requirejs-bundler'),
		rmd		= require('gulp-remove-markdown'),
		// BASE DIRECTORIES
		bases	= {
			bower	: './bower_modules/',
			src		: './frontend/src/',
			dev		: './frontend/dev/',
			prod	: './frontend/prod/',
			base	: './'
		},
		// BOWER DIRECTORIES - USED TO COPY INTO ASSETS
		bower		= {
			fontawesome	: {
				less		: ['font-awesome/less/**/*.less'],
				fonts		: ['font-awesome/fonts/**/*']
			},
			jquery		: ['jquery/dist/jquery.js'],
			velocity	: ['velocity/velocity.js', 'velocity/velocity.ui.js'],
			knockout	: ['knockoutjs/dist/knockout.js', 'knockout-projections/dist/knockout-projections.js'],
			require		: ['requirejs/require.js', 'requirejs-text/text.js', 'requirejs-domready/domReady.js'],
			crossroads	: ['crossroads/dist/crossroads.js'],
			hasher		: ['hasher/dist/js/hasher.js'],
			signals		: ['js-signals/dist/signals.js']
		};

	//////////////////////////////////////////////////////////////////////////////
	/// CLEAN - DELETE BUILD FILES AND DIRECTORIES                              //
	//////////////////////////////////////////////////////////////////////////////

	// CLEAN UP BUILD FOLDERS BEFORE COMPILING PROJECT
	gulp.task('clean_prod', function () {
		return clean(['**/*'], { cwd: bases.prod, read: false }, util.log('CLEANUP:  Production Environment - Files removed from', chalk.cyan('\'./frontend/prod/\'')));
	});
	gulp.task('clean_dev', function () {
		return clean(['**/*'], { cwd: bases.dev, read: false }, util.log('CLEANUP:  Development Environment - Files removed from', chalk.cyan('\'./frontend/dev/\'')));
	});
	gulp.task('clean_base', function () {
		return clean(['README.md', 'LICENSE', 'CONTRIBUTING.md', 'CHANGELOG.md' ], { cwd: bases.base, read: false }, util.log('CLEANUP:  Repository documentation files removed from ' + chalk.cyan('\'./\'')));
	});
	gulp.task('clean_src', function () {
		return clean(['less/font.awesome/**/*', 'js/modules/**/*', 'fonts/**/*'], { cwd: bases.src, read: false }, util.log('CLEANUP:  Asset files removed from ' + chalk.cyan('\'./frontend/src/\'')));
	});
	gulp.task('cleanup', ['clean_base', 'clean_dev', 'clean_prod', 'clean_src'], function () {
		return gulp.start('copy_assets');
	});

	//////////////////////////////////////////////////////////////////////////////
	/// COPY - ASSETS                                                           //
	//////////////////////////////////////////////////////////////////////////////

	// COPY FILES - VELOCITY
	gulp.task('copy_velocity', function () {
		return gulp.src(bower.velocity, { cwd: bases.bower })
			.pipe(gulp.dest(bases.src + 'js/modules/velocity/'));
	});
	// COPY FILES - PROJECT DOCUMENTATION
	gulp.task('copy_projectdocs', function () {
		return gulp.src(['md/README.md', 'md/CONTRIBUTING.md', 'md/CHANGELOG.md'], { cwd: bases.src })
			.pipe(gulp.dest(bases.base));
	});
	// COPY FILES - CROSSROADS
	gulp.task('copy_crossroads', function () {
		return gulp.src(bower.crossroads, { cwd: bases.bower })
			.pipe(gulp.dest(bases.src + 'js/modules/crossroads/'));
	});
	// COPY FILES - HASHER
	gulp.task('copy_hasher', function () {
		return gulp.src(bower.hasher, { cwd: bases.bower })
			.pipe(gulp.dest(bases.src + 'js/modules/hasher/'));
	});
	// COPY FILES - VELOCITY
	gulp.task('copy_signals', function () {
		return gulp.src(bower.signals, { cwd: bases.bower })
			.pipe(gulp.dest(bases.src + 'js/modules/signals/'));
	});
	// COPY FILES - KNOCKOUT
	gulp.task('copy_knockout', function () {
		var projectionsFilter	= filter('**/*projections.js', { restore: true });
		return gulp.src(bower.knockout, { cwd: bases.bower })
			.pipe(projectionsFilter)
			.pipe(rename({ basename: 'knockout.projections' }))
			.pipe(projectionsFilter.restore)
			.pipe(gulp.dest(bases.src + 'js/modules/knockout/'));
	});
	// COPY FILES - REQUIREJS
	gulp.task('copy_require', function () {
		return gulp.src(bower.require, { cwd: bases.bower })
			.pipe(gulp.dest(bases.src + 'js/modules/require/'));
	});
	// COPY FILES - JQUERY
	gulp.task('copy_jquery', function () {
		return gulp.src(bower.jquery, { cwd: bases.bower })
			.pipe(gulp.dest(bases.src + 'js/modules/jquery/'));

	});
	// COPY FILES - FONT AWESOME
	gulp.task('copy_fontawesome_less', function () {
		return gulp.src(bower.fontawesome.less, { cwd: bases.bower })
			.pipe(gulp.dest(bases.src + 'less/font.awesome/'));
	});
	gulp.task('copy_fontawesome_fonts', function () {
		return gulp.src(bower.fontawesome.fonts, { cwd: bases.bower })
			.pipe(gulp.dest(bases.prod + 'fonts/font.awesome/'))
			.pipe(gulp.dest(bases.dev + 'fonts/font.awesome/'));
	});
	// WRAPPER -  COPY BOWER ASSETS TO WORKING DIRECTORY
	gulp.task('copy_assets', ['copy_jquery', 'copy_velocity', 'copy_knockout', 'copy_require', 'copy_crossroads', 'copy_hasher', 'copy_signals', 'copy_fontawesome_fonts', 'copy_fontawesome_less', 'copy_projectdocs'], function () {
		return gulp.start('build');
	});

	//////////////////////////////////////////////////////////////////////////////
	/// PROCESS - MARKDOWN                                                      //
	//////////////////////////////////////////////////////////////////////////////

	gulp.task('process_md', function () {
		var licenseFilter	= filter('*LICENSE.md', { restore: true }),
			humansFilter	= filter(['*HUMANS.md'], { restore: true }),
			robotsFilter	= filter(['*ROBOTS.md'], { restore: true }),
			repoFilter		= filter(['*README.md', '*CONTRIBUTING.md', '*CHANGELOG.md'], { restore: true });
		return gulp.src('md/*.md', { cwd: bases.src })
			.pipe(licenseFilter)
			.pipe(rmd())
			.pipe(rename({ extname: '.txt', basename: 'license' }))
			.pipe(gulp.dest(bases.dev))
			.pipe(gulp.dest(bases.prod))
			.pipe(rename({ extname: '', basename: 'LICENSE' }))
			.pipe(gulp.dest(bases.base))
			.pipe(licenseFilter.restore)
			.pipe(humansFilter)
			.pipe(rmd())
			.pipe(rename({ extname: '.txt', basename: 'humans'}))
			.pipe(gulp.dest(bases.prod))
			.pipe(gulp.dest(bases.dev))
			.pipe(humansFilter.restore)
			.pipe(robotsFilter)
			.pipe(rmd())
			.pipe(rename({ extname: '.txt', basename: 'robots'}))
			.pipe(gulp.dest(bases.prod))
			.pipe(gulp.dest(bases.dev))
			.pipe(robotsFilter.restore)
			.pipe(repoFilter)
			.pipe(gulp.dest(bases.base))
			.pipe(repoFilter.restore)
			.pipe(md())
			.pipe(gulp.dest(bases.dev + 'media/docs/support/documentation/'))
			.pipe(gulp.dest(bases.prod + 'media/docs/support/documentation/'));
	});

	//////////////////////////////////////////////////////////////////////////////
	/// PROCESS - JAVASCRIPT                                                    //
	//////////////////////////////////////////////////////////////////////////////

	// COMPILE - JS
	gulp.task('process_js', function () {
		return gulp.src(['js/**/*.js'], { cwd: bases.src })
			.pipe(gulp.dest(bases.dev + 'js/'));
	});

	//////////////////////////////////////////////////////////////////////////////
	/// PROCESS - LESS TO CSS                                                   //
	//////////////////////////////////////////////////////////////////////////////

	// COMPILE - LESS - CORE REQUIREMENT BASE LOAD
	gulp.task('process_src_app_css', function () {
		return gulp.src(['less/application/wrapper.less'], { cwd: bases.src })
			.pipe(less())
			.pipe(rename({ basename: 'application.styles' }))
			.pipe(gulp.dest(bases.dev + 'css/'));
	});
	// COMPILE - LESS - CORE REQUIREMENT BASE LOAD
	gulp.task('process_src_err_css', function () {
		return gulp.src(['less/http.error/wrapper.less'], { cwd: bases.src })
			.pipe(less())
			.pipe(rename({ basename: 'application.http.error.styles' }))
			.pipe(gulp.dest(bases.dev + 'css/'));
	});

	//////////////////////////////////////////////////////////////////////////////
	/// PROCESS - JADE TO HTML                                                  //
	//////////////////////////////////////////////////////////////////////////////

	// COMPILE - JADE - KNOCKOUT COMPONENTS
	gulp.task('process_jade_components', function () {
		return gulp.src(['jade/templates/**/*.jade'], { cwd: bases.src })
			.pipe(jade({ pretty	: true })
				.on('error', util.log))
			.pipe(gulp.dest(bases.dev + 'js/'));
	});
	// COMPILE - JADE - HTTP STATUS ERROR PAGES
	gulp.task('process_jade_error', function () {
		return gulp.src(['jade/http.error/*.jade'], { cwd: bases.src })
			.pipe(jade({ pretty	: true })
				.on('error', util.log))
			.pipe(gulp.dest(bases.dev + 'templates/http.error/'))
			.pipe(gulp.dest(bases.prod + 'templates/http.error/'));
	});
	// COMPILE - JADE - CORE INDEX HTML
	gulp.task('process_jade_index', function () {
		return gulp.src(['jade/index/index.jade'], { cwd: bases.src })
			.pipe(jade({ pretty	: true })
				.on('error', util.log))
			.pipe(gulp.dest(bases.dev));
	});
	//////////////////////////////////////////////////////////////////////////////
	/// BUILD - FULL SRC DIST                                                   //
	//////////////////////////////////////////////////////////////////////////////

	// COPY FILES - FLAT FILES
	gulp.task('build_misc', function () {
		return gulp.src(['apache/.htaccess', 'xml/*.xml'], { cwd: bases.src })
			.pipe(gulp.dest(bases.dev))
			.pipe(gulp.dest(bases.prod));
	});
	// COMPRESS IMAGES
	gulp.task('build_images', function () {
		var pngFilter	= filter('**/*.png', { restore: true });
		var jgpFilter	= filter('**/*.jpg', { restore: true });
		return gulp.src(['media/images/**'], { cwd: bases.src })
			.pipe(pngFilter)
			.pipe(image())
			.pipe(pngFilter.restore)
			.pipe(jgpFilter)
			.pipe(image())
			.pipe(jgpFilter.restore)
			.pipe(gulp.dest(bases.dev + 'media/images/'))
			.pipe(gulp.dest(bases.prod + 'media/images/'));
	});
	// COMPRESS CSS
	gulp.task('build_css', ['process_src_err_css', 'process_src_app_css'], function () {
		return gulp.src(['css/**/*.css'], { cwd: bases.dev })
			.pipe(css())
			.pipe(gulp.dest(bases.prod + 'css/'));
	});
	// FIX HTML PATHS FOR OPTIMIZED SCRIPTS - ONLY ON DIST
	gulp.task('build_html', ['process_jade_index', 'process_jade_error', 'process_jade_components', 'process_md'], function () {
		return gulp.src('./index.html', { cwd: bases.dev })
			.pipe(rehtml({
				'optimize_js'	: 'js/application.scripts.js'
			}))
			.pipe(gulp.dest(bases.prod));
	});
	// SEND SCRIPTS THROUGH OPTIMIZER
	gulp.task('build_js', ['process_js'], function () {
		// OPTIMIZE CONFIGURE SETTINGS NEEDED FOR R.JS
		var requireJsRuntimeConfig		= vm.runInNewContext(fs.readFileSync('frontend/dev/js/application/application.settings.js') + '; require;'),
			requireJsOptimizerConfig	= merge(requireJsRuntimeConfig, {

				// BASELINE THE PATH TO SOURCE DIRECTORY
				baseUrl			: './frontend/dev/js/',
				// DEFINE PATHS - PRIMARILY FOR THE REQUIRE.JS SCRIPT
				paths			: {
					requireLib		: 'modules/require/require'
				},
				// IF YOU ONLY INTEND TO OPTIMIZE A MODULE (AND ITS DEPENDENCIES), WITH
				// A SINGLE FILE AS THE OUTPUT, YOU CAN SPECIFY THE MODULE OPTIONS INLINE,
				// INSTEAD OF USING A 'MODULES' SECTION. 'EXCLUDE', INCLUDE' AND 'INSERTREQUIRE'
				// ARE ALL ALLOWED AS SIBLINGS TO NAME. THE NAME OF THE OPTIMIZED
				// FILE IS SPECIFIED BY 'OUT'.
				name			: 'application/application.startup',
				// START UP REQUIREMENTS TO INCLUDE IN SCRIPT
				// LIST KNOCKOUT COMPONENTS AND PAGES HERE
				include			: [
					'requireLib',
					'components/template/template'
				],
				// NOTE THAT INSERTREQUIRE DOES NOT AFFECT OR ADD TO THE MODULES THAT ARE BUILT INTO
				// THE BUILD BUNDLE. IT JUST ADDS A REQUIRE([]) CALL TO THE END OF THE BUILT FILE FOR
				// USE DURING THE RUNTIME EXECUTION OF THE BUILT CODE.
				insertRequire	: ['application/application.startup'],
				// NAME OF SCRIPT TO OUTPUT
				out				: 'application.scripts.js',
				// HAVE COMPONENTS OR PAGES LOAD ON DEMAND BY BUNDLING TOGETHER
				bundles			: {
					// 'bundle-name'	: ['pathto/module', 'another/module'],
					// 'bundle-name'	: ['pathto/module', 'another/example/module']
				}
			});
		return rjs(requireJsOptimizerConfig)
			.pipe(ugly())
			.pipe(gulp.dest(bases.prod + 'js/'));
	});
	// WRAPPER - BUILD
	gulp.task('build', ['build_images', 'build_html', 'build_misc', 'build_css', 'build_js'], function (cb) {
		cb();
		util.log('STATUS:   All Builds Complete!');
		return util.log('INFO:     - use the \'' + chalk.cyan('gulp watch') + '\' command to process files automatically when modified -');
	});

	// DOING THE CLEANUP AT THE TOP LEVEL BEFORE THE ENTIRE SITE IS PROCESSED KEEPS THE DELETE ACTIONS OUT OF T

	// WRAPPER - DEFAULT ORDER OF TASKS
	gulp.task('default', ['cleanup']);
	//////////////////////////////////////////////////////////////////////////////
	/// WATCH FILE SYSTEM FOR MODIFICATIONS                                     //
	//////////////////////////////////////////////////////////////////////////////

	// WATCH FILES
	gulp.task('watch', function (cb) {
		// WATCH FOR FILE CHANGES AND RUN A GULP TASK IF A CHANGE OCCURS
		gulp.watch(['apache/**/.htacesss', 'xml/**/*.xml'], { cwd: bases.src }, ['build_misc']);
		gulp.watch(['md/**/*.md'], { cwd: bases.src }, ['build_html']);
		gulp.watch(['jade/**/*.jade'], { cwd: bases.src }, ['build_html']);
		gulp.watch(['less/**/*.less'], { cwd: bases.src }, ['build_css']);
		gulp.watch(['media/images/**'], { cwd: bases.src }, ['build_images']);
		gulp.watch(['js/**/*.js'], { cwd: bases.src }, ['build_js']);
		cb();
		util.log(chalk.green('Watcher is now active.'), 'Watcher stops on any', chalk.red('compile error'), '.');
		return util.log('Press', chalk.yellow('CTRL + C'), 'to stop Watcher and return to command prompt.');
	});
}());
