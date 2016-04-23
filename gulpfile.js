
var gulp = require('gulp'),
  connect = require('gulp-connect'),
  watch =require('gulp-watch'),
  livereload = require('gulp-livereload');

var os = require('os');
var open = require('gulp-open');

var path =(function (cmd_path) {

    var filedirstr = cmd_path.split("\\").pop();

    return {
        urlpage:filedirstr,
        urljs:filedirstr+"/js",
        urlimages:filedirstr+"/images",
        urlcss:filedirstr+"/css"
    }

})(process.env.INIT_CWD); ;


gulp.task('webserver', function() {
  connect.server({
      livereload:true,
  });
});


var browser = os.platform() === 'linux' ? 'google-chrome' : (
 os.platform() === 'darwin' ? 'google chrome' : (
 os.platform() === 'win32' ? 'chrome' : 'firefox'));



gulp.task('app',['webserver'], function(){
  var options = {
    uri: 'http://localhost:8080/'+path.urlpage+"/index.html",
    app: browser
  };
  gulp.src("/")
  .pipe(open(options));
});


gulp.task('html', function () {
    console.log("TTT");
  gulp.src(path.urlpage+'/*.html')
  .pipe(livereload());
});

gulp.task('js',function () {
     gulp.src(path.urljs+'/*.js')
  .pipe(livereload());
});


gulp.task('css',function () {
     gulp.src(path.urlcss+'/*.css')
  .pipe(livereload());
});

gulp.task('watch', function () {
  livereload.listen();
  gulp.watch(path.urlpage+'/*.html', ['html']);
  gulp.watch(path.urljs+'/*.js', ['js']);
  gulp.watch(path.urljs+'/*.css', ['css']);
});



console.log( os.networkInterfaces());

gulp.task('default', ['app','watch']);


gulp.task("Test",function () {
    console.log("Test");
});
