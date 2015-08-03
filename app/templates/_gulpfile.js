var gulp = require('gulp'),
  del = require('del'),
  ticons = require('ticons'),
  Q = require('q'),
  mainBowerFiles = require('main-bower-files'),
  $ = require('gulp-load-plugins')(),
  gulpsync = require('gulp-sync')(gulp);

var config = require("./config")();
var prod = false;
var argv = require('yargs').argv;


// style
gulp.task('style', function(cb) {
  return gulp.src(config.src.styles)
    .pipe($.plumber({
      errorHandler: function(err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe($.newer(config.dist.style))
    .pipe($.sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest(config.dist.style))
    .pipe($.size());
});

// style_tmp -> using usemin
gulp.task('style_tmp', function(cb) {
  return gulp.src(config.src.styles)
    .pipe($.plumber({
      errorHandler: function(err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe($.sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest(config.tmp.style))
    .pipe($.size());
});

// scripts
gulp.task('scripts', function(cb) {
  return gulp.src(config.src.scripts)
    .pipe($.plumber({
      errorHandler: function(err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe($.newer(config.dist.script))
    .pipe(gulp.dest(config.dist.script))
    .pipe($.size());
});

// scripts_tmp -> using usemin
gulp.task('scripts_tmp', function(cb) {
  return gulp.src(config.src.scripts)
  .pipe($.plumber({
    errorHandler: function(err) {
      console.log(err);
      this.emit('end');
    }
  }))
  .pipe(gulp.dest(config.tmp.script))
  .pipe($.size());
});

//fonts 
gulp.task('fonts', function() {
  return gulp.src(mainBowerFiles({
      filter: /^.*.(eot|svg|ttf|woff|woff2)$/i
    }))
    .pipe($.newer(config.dist.font))
    .pipe($.flatten())
    .pipe(gulp.dest(config.dist.font))
    .pipe($.size());
});

// index
gulp.task('index', function(cb) {
  return gulp.src(config.src.index)
    .pipe($.newer(config.dist.index))
    .pipe(gulp.dest(config.dist.index))
    .pipe($.size());
});

// html
gulp.task('views', function(cb) {
  return gulp.src(config.src.views)
    .pipe($.newer(config.dist.view))
    .pipe($.if(prod, $.minifyHtml()))
    .pipe(gulp.dest(config.dist.view))
    .pipe($.size());
});

//images
gulp.task('images', function(cb) {
  return gulp.src(config.src.images)
    .pipe($.newer(config.dist.image))
    .pipe($.if(prod, $.cache($.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    }))))
    .pipe(gulp.dest(config.dist.image))
    .pipe($.size());
});

// wiredep
gulp.task('wiredep', function() {
  return require('wiredep')({
    src: config.src.index,
    ignorePath: '../www/'
  });
});

//config
gulp.task('constant', function(cb) {
  var config = require("./constant.json");
  return $.ngConstant({
      name: 'Blind',
      constants: $.if(prod, config.prod, config.dev),
      deps: false,
      stream: true
    })
    .pipe($.rename("constant.js"))
    .pipe(gulp.dest('app/scripts/configs/'));
});

//watch
gulp.task('watch', function(cb) {
  $.cache.clearAll();

  gulp.watch('bower.json', ['wiredep']);
  gulp.watch(config.src.script, ['scripts']);
  gulp.watch(config.src.index, ['index']);
  gulp.watch(config.src.views, ['views']);
  gulp.watch(config.src.styles, ['style']);
  gulp.watch(config.src.images, ['images']);
});

//usemin
gulp.task('usemin', function(cb) {
  return gulp.src(config.src.index)
    .pipe($.usemin({
      vendor_css: [$.minifyCss(), 'concat'],
      app_css: [$.minifyCss(), 'concat'],
      vendor_js: [$.uglify(), $.rev()],
      app_js: [$.uglify(), $.rev()],
      html: [$.minifyHtml({
        empty: true
      })],
    }))
    .pipe(gulp.dest(config.dist.index));
});

//watch
gulp.task('clear', function(cb) {
  return del([config.dist.style,
      config.dist.script,
      config.dist.image,
      config.dist.view,
      config.dist.font], {
    force: true
  }, function(err, deletedFiles) {
    cb();
  });
});



////////////////////////////////////////////////////////////
//
// resource
// 1. icon
// 2. splash
// 3. clear_icon
////////////////////////////////////////////////////////////

//clear icon
gulp.task('clear_icons', function(cb) {
  return del(config.resource.dist, {
    force: true
  }, function(err, deletedFiles) {
    cb();
  });
});

// generate_icon
gulp.task('generate_icon', function(cb) {
  return ticons.icons(config.resource.icon, function(err, output) {
    if (err) {throw err;}
    cb();
  });
});

// generate_splash
gulp.task('generate_splash', function(cb) {
  return ticons.splashes(config.resource.splash, function(err, output) {
    if (err) {throw err;}
    cb();
  });
});

//copy_icon
gulp.task('copy_icon', function() {
  return gulp.src(config.resource.copy.icon.src, {
    base: config.resource.copy.icon.base
  })
  .pipe(gulp.dest(config.resource.copy.icon.dest));
});

//copy_splash
gulp.task('copy_splash', function() {
  return gulp.src(config.resource.copy.splash.src, {
    base: config.resource.copy.splash.base
  })
  .pipe(gulp.dest(config.resource.copy.splash.dest));
});



////////////////////////////////////////////////////////////
//
// ionic task
// 1. ionic run 
// 2. ionic emulate
// 3. ionic serve
////////////////////////////////////////////////////////////

// ionic run wrapper
gulp.task('ionic:emulate', $.shell.task([
  'ionic emulate ' + argv.arg
]));

gulp.task('ionic:run', $.shell.task([
  'ionic run ' + argv.arg
]));

// ionic run wrapper
gulp.task('ionic:serve', $.shell.task([
  'ionic serve'
]));





////////////////////////////////////////////////////////////
//
// main task
// 1. gulp resource
// 2. gulp serve
// 3. gulp run 
// 4. gulp emulate
// 5. gulp build
// 
////////////////////////////////////////////////////////////
/**
 * generate icon,splash
 * @return {[type]}   [description]
 */
gulp.task('resource', function(cb) {
  prod = false;
  gulp.start(gulpsync.sync(["clear_icons", "generate_icon", "generate_splash", "copy_icon","copy_splash"]));
});

/**
 * serve
 * @return {[type]}   [description]
 */
gulp.task('serve', function(cb) {
  prod = false;
  gulp.start(gulpsync.sync(["clear", "constant", "wiredep", "images", "fonts", "scripts", "style", "index", "views"]));
  gulp.start(gulpsync.sync(["watch"]));
  gulp.start(gulpsync.sync(["ionic:serve"]));
});

/**
 * run
 * @return {[type]}   [description]
 */
gulp.task('run', function(cb) {
  prod = false;
  gulp.start(gulpsync.sync(["clear", "constant", "wiredep", "images", "fonts", "scripts", "style", "index", "views"]));
  gulp.start(gulpsync.sync(["watch"]));
  gulp.start(gulpsync.sync(["ionic:run"]));
});


/**
 * emulate
 * @return {[type]}   [description]
 */
gulp.task('emulate', function(cb) {
  prod = false;
  gulp.start(gulpsync.sync(["clear", "constant", "wiredep", "images", "fonts", "scripts", "style", "index", "views"]));
  gulp.start(gulpsync.sync(["watch"]));
  gulp.start(gulpsync.sync(["ionic:emulate"]));
});


/**
 * build
 * @return {[type]}   [description]
 */
gulp.task('build', function(cb) {
  prod = true;
  gulp.start(gulpsync.sync(["clear", "constant", "wiredep", "images", "fonts", "scripts_tmp", "style_tmp", "views", "usemin"]));
});
