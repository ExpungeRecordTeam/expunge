"use strict";

// Include Gulp & tools we'll use
var gulp = require("gulp");
var $ = require("gulp-load-plugins")();
var del = require("del");
var runSequence = require("run-sequence");
var browserSync = require("browser-sync");
var reload = browserSync.reload;
var pug = require("gulp-pug");

// Optimize images
gulp.task("images", function() {
  return gulp.src("app/images/**/*")
    .pipe($.imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest("dist/images"))
    .pipe($.size({title: "images"}));
});

// Copy all files at the root level (app)
gulp.task("copy", function() {
  return gulp.src(["app/*"])
    .pipe(gulp.dest("dist"))
    .pipe($.size({title: "copy"}));
});

// Copy web fonts to dist
gulp.task("fonts", function() {
  return gulp.src(["app/fonts/**"])
    .pipe(gulp.dest("dist/fonts"))
    .pipe($.size({title: "fonts"}));
});

// Copy web js to dist
gulp.task("js", function() {
  return gulp.src(["app/scripts/**"])
    .pipe($.uglify({preserveComments: "some"}))
    .pipe(gulp.dest("dist/scripts"))
    .pipe($.size({title: "scripts"}));
});

var AUTOPREFIXER_BROWSERS = [
  "ie >= 10",
  "ie_mob >= 10",
  "ff >= 30",
  "chrome >= 34",
  "safari >= 7",
  "opera >= 23",
  "ios >= 7",
  "android >= 4.4",
  "bb >= 10"
];

var cssDirectories = [
  "app/styles/*.scss",
  "app/styles/**/*.css",
  "app/styles/components/components.scss"
];

// Compile and automatically prefix stylesheets
gulp.task("styles", function () {
  return gulp.src(cssDirectories)
    .pipe($.sass({
      precision: 10,
      onError: console.error.bind(console, "Sass error:")
    }))
    .pipe($.autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
    // Concatenate and minify styles
    .pipe($.csso())
    .pipe(gulp.dest("dist/styles"))
    .pipe($.size({title: "styles"}));
});

// Scan your HTML for assets & optimize them
gulp.task("html", function () {
  return gulp.src("app/templates/*.pug")
    .pipe(pug())
    // Minify any HTML
    .pipe($.minifyHtml())
    // Output files
    .pipe(gulp.dest("dist"))
    .pipe($.size({title: "html"}));
});

// Watch files for changes & reload
gulp.task("serve", ["styles", "html"], function () {
  browserSync({
    notify: false,
    logPrefix: "WSK",
    server: ["dist"]
  });

  gulp.watch(["app/templates/*.pug"], ["html", reload]);
  gulp.watch(["app/styles/**/*.{scss,css}"], ["styles", reload]);
  gulp.watch(["app/scripts/**/*.js"], ["js", reload]);
  gulp.watch(["app/images/**/*"], reload);
});

// Clean output directory
gulp.task("clean", del.bind(null, ["dist/*"], {dot: true}));

// Build production files, the default task
gulp.task("default", ["clean"], function (cb) {
  runSequence("styles", "js", ["html", "images", "fonts", "copy"], cb);
});
