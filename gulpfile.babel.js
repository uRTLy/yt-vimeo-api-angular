import gulp from "gulp";
import sass from "gulp-sass";
import babel from "gulp-babel";
import eslint from "gulp-eslint";
import browserify from "browserify";
import source from "vinyl-source-stream";
import plumber from "gulp-plumber";
import connect from "gulp-connect";
import { Server } from "karma";
import clean from "gulp-clean";

const paths = {
  js: "./app/**/*.js",
  sass: "./app/sass/**/*.sass",
  html: "./app/**/*.html",
  waitingToBundle: "./waitingToBundle",
  distJS: "./dist/js",
  distCSS: "./dist/css",
  distHTML:"./dist/index.html"
};

gulp.task("eslint", () => {
  return gulp.src(paths.js)
  .pipe(plumber())
  .pipe(eslint())
  .pipe(plumber.stop())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

gulp.task("test", (done) => {
  new Server({
    configFile: __dirname + "/karma.conf.js",
    singleRun: true
  }, done).start();
});

gulp.task("clean", () => {
  return gulp.src(paths.waitingToBundle, {read: false})
    .pipe(clean());
});

gulp.task("connect", () => {
  connect.server({
    root: "dist",
    livereload: true
  });
});

gulp.task("es6", ["clean"], () => {
  return gulp.src(paths.js)
    .pipe(plumber())
    .pipe(babel({ presets: ["es2015"]}))
    .pipe(gulp.dest(paths.waitingToBundle));
});

gulp.task("sass", () =>{
  return gulp.src(paths.sass)
    .pipe(sass())
    .pipe(gulp.dest(paths.distCSS))
    .pipe(connect.reload());
});

gulp.task("html", () => {
  return gulp.src([paths.html, paths.distHTML])
    .pipe(connect.reload());
});

gulp.task("bundle", ["es6"], () => {
  return browserify(`${paths.waitingToBundle}/app.module.js`)
    .bundle()
    .pipe(source("bundle.js"))
    .pipe(gulp.dest(paths.distJS))
    .pipe(connect.reload());
});

gulp.task("watch", ["connect"], () => {

  gulp.watch([paths.html, paths.distHTML], ["html"]);
  gulp.watch(paths.sass, ["sass"]);
  gulp.watch(paths.js, ["eslint", "bundle"]);

});
