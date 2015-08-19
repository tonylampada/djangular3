////////// requires
var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var copy = require('gulp-copy');
var linker = require('gulp-linker');
var webserver = require('gulp-webserver');
var ngTemplates = require('gulp-ng-templates');
var htmlmin = require('gulp-htmlmin');
var merge = require('merge-stream');
var jshint = require('gulp-jshint');
var karma = require('karma').server;
var argv = require('yargs').argv;

////////// parameters
var mock = argv.mock == 'true' || argv.mock === undefined;
var prod = argv.prod == 'true';

////////// code location
var app = {
    js: function(env){
        var apijs = mock ? './src/api/api_mock.js' : './src/api/api.js';
        var settingsjs = env == 'prod' ? './settings/prod.js' : './settings/dev.js';
        return [
            settingsjs,
            './src/main/app_global.js',
            './src/commons/jsutils.js',
            './src/*.js',
            './src/!(api)/**/*.js',
            apijs,
            '!./src/**/docs/**/*.js',
        ];
    },
    jstests: [
        './settings/dev.js',
        './src/main/app_global.js',
        './src/commons/jsutils.js',
        './src/*.js',
        './src/!(api)/**/*.js',
        './src/api/api_mock.js',
    ],
    scss : [
        './src/**/*.scss',
    ],
    html: [
        './src/**/*.html',
        '!./src/**/docs**/*.html',
    ],
};

var appdocs = {
    js: [
        './src/**/docs/**/*.js',
        '!./src/**/docs/**/test_*.js',
    ],
    html: [
        './src/**/docs**/*.html',
    ],
    samples: ['./src/**/docs/**/*.*'],
};

var docs = {
    js: [
        './docs_src/**/*.js',
    ],
    html: [
        './docs_src/**/*.html',
    ]
}

var lib = {
    js: [
        './lib/jquery/jquery.js',
        './lib/angular-1.4.0/angular.js',
        './lib/angular-1.4.0/angular-aria.js',
        './lib/angular-1.4.0/angular-animate.js',
        './lib/angular-1.4.0/angular-cookies.js',
        './lib/bootstrap/dist/js/bootstrap.js',
        './lib/angular-ui-router-0.2.15/angular-ui-router.js',
    ],
    jsmin: [
        './lib/jquery/jquery.min.js',
        './lib/angular-1.4.0/angular.min.js',
        './lib/angular-1.4.0/angular-aria.min.js',
        './lib/angular-1.4.0/angular-animate.min.js',
        './lib/angular-1.4.0/angular-cookies.min.js',
        './lib/bootstrap/dist/js/bootstrap.min.js',
        './lib/angular-ui-router-0.2.15/angular-ui-router.min.js',
    ],
    css: [
        './lib/bootstrap/dist/css/bootstrap.css',
        './lib/bootstrap/dist/css/bootstrap-theme.css',
    ],
    cssmin: [
        './lib/bootstrap/dist/css/bootstrap.min.css',
        './lib/bootstrap/dist/css/bootstrap-theme.min.css',
    ],
    tocopy: [
        './lib/bootstrap/dist/fonts/**',
    ],
}

var testlib = {
    js: [
        './lib/angular-1.4.0/angular-mocks.js',
        './testlib/chai/chai.js',
        './testlib/sinon/sinon.js',
        './testlib/setup_globals.js',
    ],
};

////////// Big tasks

var commontasks = ['concatjslib', 'concatjslibmin', 'concatcsslib', 'concatcsslibmin', 'sass', 'copylibfiles'];
var concatjstasks = ['concatjsapp', 'concatjsappdocs', 'concatjsdocs']
gulp.task('dev', commontasks.concat(['linkjsdev']));
gulp.task('prod', commontasks.concat(concatjstasks).concat(['copydocssamples', 'linkjsprod']));

////////// Common tasks
concattask('concatjslib', {src: lib.js, dest: 'js/lib.js'});
concattask('concatjslibmin', {src: lib.jsmin, dest: 'js/lib.min.js'});
concattask('concatcsslib', {src: lib.css, dest: 'css/lib.css'});
concattask('concatcsslibmin', {src: lib.cssmin, dest: 'css/lib.min.css'});
copytask('copylibfiles', lib.tocopy, '', {prefix: 3});
jshinttask('jshintall')
sasstask('sass');

////////// Dev tasks
linktaskdev('linkjsdev');
webservertask('runserver');
jstesttask('test')

////////// Prod tasks
concattask('concatjsapp', {src: app.js('prod'), html: app.html, ngmodule: 'apptemplates', tmplprefix: 'TEMPLATE_CACHE/', dest: 'js/app.js'});
concattask('concatjsappdocs', {src: appdocs.js, dest: 'js/appdocs.js'});
concattask('concatjsdocs', {src: docs.js, html: docs.html, ngmodule: 'docstemplates', tmplprefix: 'TEMPLATE_CACHE/', dest: 'js/docs.js'});
copytask('copydocssamples', appdocs.samples, 'docs_samples/', {prefix: 1});
linktaskprod('linkjsprod');

////////// Helper functions
function concattask(id, options){
    gulp.task(id, function() {
        var stream_concat = gulp
            .src(options.src)
            .pipe(concat(options.dest));
        if(options.html){
            var stream_ngtemplates = gulp.src(options.html)
                .pipe(htmlmin({collapseWhitespace: true}))
                .pipe(ngTemplates({
                    filename: 'zzz.js',
                    module: options.ngmodule,
                    path: function (path, base) {
                        var result = options.tmplprefix + path.replace(base, '');
                        // console.log(result);
                        return result;
                    },
                }));
            stream_concat = merge(stream_concat);
            stream_concat.add(stream_ngtemplates);
            stream_concat = stream_concat.pipe(concat(options.dest))
        }
        return stream_concat
            .pipe(gulp.dest('./dist/'));
    });
}

function jstesttask(id){
    var singleRun = argv.singleRun == 'true';
    var coverage = argv.coverage == 'true';
    var grep = argv.grep;

    var karmacfg = {
        basePath: './',
        frameworks: ['mocha'],
        reporters: ['progress'],
        browsers: ['PhantomJS'],
        autoWatch: true,
        singleRun: singleRun,
        client: {
            mocha: {
                grep: grep,
            }
        },
        colors: true,
        files : concatall([
            lib.js,
            testlib.js,
            docs.js,
            app.jstests,
        ]),
    }
    if(coverage){
        karmacfg.reporters = ['progress', 'coverage'];
        karmacfg.preprocessors = {
            './src/**/!(docs)/*.js': ['coverage']
        };
        karmacfg.coverageReporter = {
            reporters: [
                { type : 'html', dir : 'coverage/' },
                { type : 'cobertura'},
            ]
        };
    }

    gulp.task(id, function (done) {
        karma.start(karmacfg, done);
    });
}

function concatall(arrays){
    var result = [];
    arrays.map(function(arr){
        result = result.concat(arr);
    });
    return result;
}

function sasstask(id){
    gulp.task('sass', function () {
        gulp.src(app.scss)
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest('./dist/css'));
    });
}

function jshinttask(id){
    gulp.task(id, function() {
        return gulp.src(['./src/**/*.js', './docs_src/**/*.js'])
            .pipe(jshint())
            .pipe(jshint.reporter('jshint-stylish'))
            .pipe(jshint.reporter('fail'))
        return stream;
    });
}

function linktaskdev(id){
    gulp.task(id, function() {
        return gulp.src('./src/*.html')
            .pipe(linker(linker_params(appdocs.js, 'APPDOCSJS', '.')))
            .pipe(linker(linker_params(app.js('dev'), 'APPJS', '.')))
            .pipe(linker(linker_params(docs.js, 'DOCSJS', '.')))
            .pipe(gulp.dest('./dist/'));
    });
}

function linktaskprod(id){
    gulp.task(id, ['concatjsapp', 'concatjsappdocs', 'concatjsdocs'], function() {
        return gulp.src('./src/*.html')
            .pipe(linker(linker_params('./dist/js/app.js', 'APPJS', 'dist/')))
            .pipe(linker(linker_params('./dist/js/appdocs.js', 'APPDOCSJS', 'dist/')))
            .pipe(linker(linker_params('./dist/js/docs.js', 'DOCSJS', 'dist/')))
            .pipe(gulp.dest('./dist/'));
    });
}

function linker_params(src, marker, approot){
    return {
        scripts: src,
        startTag: '<!--'+marker+'-->',
        endTag: '<!--'+marker+' END-->',
        fileTmpl: '<script src="%s"></script>',
        appRoot: approot,
    };
}

function webservertask(id){
    gulp.task(id, function() {
        return gulp.src('.')
        .pipe(webserver({
            livereload: false,
            directoryListing: true,
            open: false,
            port: 9001,
        }));
    });
}

function copytask(id, from, to, options){
    gulp.task(id, function() {
        return gulp.src(from)
        .pipe(copy('./dist/'+to, options));
    });
}
