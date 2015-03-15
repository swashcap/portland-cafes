/* jshint node:true */
'use strict';
// generated on 2015-01-03 using generator-gulp-webapp 0.2.0
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('styles', function () {
  return $.rubySass('app/styles/',{
      sourcemap: true,
      style: 'expanded',
      precision: 10
    })
    .on('error', function (err) {
      console.error('Error!', err.message);
    })
    .pipe($.autoprefixer({browsers: ['last 1 version']}))
    .pipe(gulp.dest('.tmp/styles'));
});

/**
 * Inject application scripts using `gulp-inject`.
 * @{@link  https://www.npmjs.com/package/gulp-inject}
 */
gulp.task('injectScripts', function () {
  var scripts = gulp.src([
    'app/scripts/**/*.js',
    '!app/scripts/**/*spec.js'
  ])
    .pipe($.naturalSort())
    .pipe($.angularFilesort());

  return gulp.src('./app/index.html')
    .pipe($.inject(scripts, {relative: true}))
    .pipe(gulp.dest('./app'));
});

gulp.task('jshint', function () {
  return gulp.src('app/scripts/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'));
});

/**
 * Add application templates to a script to reduce HTTP requests.
 *
 * @{@link  https://www.npmjs.com/package/gulp-angular-templatecache}
 */
gulp.task('templates', function () {
  return gulp.src('app/scripts/**/*.html')
    .pipe($.plumber())
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe($.angularTemplatecache('templates.js', {
      base: function (file) {
        return file.relative;
      },
      module: 'portlandcafes',
      root: 'scripts/'
    }))
    .pipe(gulp.dest('.tmp/inject/'))
    .pipe($.size())
});

gulp.task('html', ['styles', 'injectScripts', 'templates'], function () {
  var lazypipe = require('lazypipe');
  var cssChannel = lazypipe()
    .pipe($.csso)
    .pipe($.replace, 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap','fonts');
  var assets = $.useref.assets({searchPath: '{.tmp,app}'});

  return gulp.src('app/*.html')
    .pipe($.inject(gulp.src('.tmp/inject/templates.js', {read: false}), {
      starttag: '<!-- inject:templates -->',
      ignorePath: '.tmp',
      addRootSlash: false
    }))
    .pipe(assets)
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', cssChannel()))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', function () {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', function () {
  return gulp.src(require('main-bower-files')().concat('app/fonts/**/*'))
    .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
    .pipe($.flatten())
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('extras', function () {
  return gulp.src([
    'app/*.*',
    '!app/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('clean', require('del').bind(null, ['.tmp', 'dist']));

gulp.task('connect', ['styles', 'injectScripts'], function () {
  var serveStatic = require('serve-static');
  var serveIndex = require('serve-index');
  var modRewrite = require('connect-modrewrite');

  var app = require('connect')()
    // Use rewriting for non-existent files
    // http://stackoverflow.com/a/20553608
    .use(modRewrite(['!\\.html|\\.js|\\.svg|\\.css|\\.png|\\.eot|\\.ttf|\\.woff$ /index.html [L]']))
    .use(require('connect-livereload')({port: 35729}))
    .use(serveStatic('.tmp'))
    .use(serveStatic('app'))
    // paths to bower_components should be relative to the current file
    // e.g. in app/index.html you should use ../bower_components
    .use('/bower_components', serveStatic('bower_components'))
    .use(serveIndex('app'));

  require('http').createServer(app)
    .listen(9000)
    .on('listening', function () {
      console.log('Started connect web server on http://localhost:9000');
    });
});

gulp.task('serve', ['connect', 'watch'], function () {
  require('opn')('http://localhost:9000');
});

// inject bower components
gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;

  gulp.src('app/styles/*.scss')
    .pipe(wiredep())
    .pipe(gulp.dest('app/styles'));

  gulp.src('app/*.html')
    .pipe(wiredep({exclude: ['bootstrap-sass-official']}))
    .pipe(gulp.dest('app'));
});

gulp.task('watch', ['connect'], function () {
  $.livereload.listen();

  // watch for changes
  gulp.watch([
    'app/**/*.html',
    '.tmp/styles/**/*.css',
    'app/scripts/**/*.js',
    'app/images/**/*'
  ]).on('change', $.livereload.changed);

  gulp.watch('app/styles/**/*.scss', ['styles']);
  gulp.watch('bower.json', ['wiredep']);
});

gulp.task('build', ['jshint', 'html', 'images', 'fonts', 'extras'], function () {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], function () {
  gulp.start('build');
});
