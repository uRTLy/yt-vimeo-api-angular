import gulp from "gulp";
// import sass from "gulp-sass";
import babel from "gulp-babel";
// import eslint from "gulp-eslint";
import browserify from "browserify";
import source from "vinyl-source-stream";
// import plumber from "gulp-plumber";
import connect from "gulp-connect";
import { Server } from "karma";
import clean from "gulp-clean";
import del from "del";
import ngHTML2JS from "browserify-ng-html2js";
import flatten from "gulp-flatten";

const paths = {
  js: "./app/",
  sass: "./app/sass/**/*.sass",
  html: "./app/**/*.html",
  temp: "./temp",
  distTemplates:"./dist/templates",
  distJS: "./dist/js/",
  distCSS: "./dist/css",
  distHTML:"./dist/index.html"
};

// gulp.task("eslint", () => {
//   return gulp.src(paths.js)
//   .pipe(plumber())
//   .pipe(eslint())
//   .pipe(plumber.stop())
//   .pipe(eslint.format())
//   .pipe(eslint.failAfterError());
// });

gulp.task("test", (done) => {
  new Server({
    configFile: __dirname + "/karma.conf.js",
    singleRun: true
  }, done).start();
});


gulp.task("connect", () => {
  connect.server({
    root: "dist",
    livereload: true
  });
});

gulp.task("es6",() => {
  return gulp.src([`${paths.js}**/*.js`,`${paths.js}*.js`])
    .pipe(flatten())
    .pipe(babel({ presets: ["es2015"]}))
    .pipe(gulp.dest(paths.temp));
});

// gulp.task("sass", () =>{
//   return gulp.src(paths.sass)
//     .pipe(sass())
//     .pipe(gulp.dest(paths.distCSS))
//     .pipe(connect.reload());
// });

gulp.task("templates",  () => {
  return gulp.src(["app/**/*.template.html", "app/*.template.html"])
    .pipe(flatten())
    .pipe(gulp.dest(paths.distTemplates));
});

gulp.task("html",["templates"], () => {
  return gulp.src([paths.distHTML, paths.html])
  .pipe(connect.reload());
});

gulp.task("bundle", ["es6", "templates"], () => {
  return browserify(`${paths.temp}/app.module.js`)
    .bundle()
    .pipe(source("bundle.js"))
    .pipe(gulp.dest(paths.distJS))
    .pipe(connect.reload());
});


gulp.task("clean-js", ["bundle"], () => {
  return del([`${paths.temp}**/*.js`,`${paths.temp}*.js`]);
});

gulp.task("watch", ["connect"], () => {
  gulp.watch([paths.html, paths.distHTML], ["html"]);
  // gulp.watch(paths.sass, ["sass"]);
  gulp.watch(["**/*.js", "*.js"], {cwd: paths.js}, ["clean-js"]);

});
