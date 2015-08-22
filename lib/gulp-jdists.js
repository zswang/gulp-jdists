/**
 * @file gulp-jdists
 *
 * Code block processing tools
 * @author
 *   zswang (http://weibo.com/zswang)
 * @version 0.0.1
 * @date 2015-08-23
 */
var jdists = require('jdists');
var through = require('through2');
var gutil = require('gulp-util');
var PluginError = require('gulp-util/lib/PluginError');
var pluginName = 'gulp-jdists';
function createError(file, err) {
  return new PluginError(pluginName, file.path + ': ' + err, {
    fileName: file.path,
    showStack: false
  });
}
function gulpJdists(options) {
  options = options || {};
  return through.obj(function (file, enc, callback) {
    if (file.isStream()) {
      return callback(createError(file, 'Streaming not supported'));
    }
    if (file.isBuffer()) {
      var contents = jdists.build(file.contents, {
        clean: options.clean,
        remove: options.remove,
        trigger: options.trigger,
        config: options.config,
        fromString: true,
        path: file.path
      });
      file.contents = new Buffer(contents);
    }
    return callback(null, file);
  });
}
module.exports = gulpJdists;