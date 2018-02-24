/**
 * @file gulp-jdists
 *
 * Code block processing tools
 * @author
 *   zswang (http://weibo.com/zswang)
 * @version 2.2.0
 * @date 2018-02-24
 */
var jdists = require('jdists');
var through = require('through2');
var gutil = require('gulp-util');
var PluginError = require('gulp-util/lib/PluginError');
var pluginName = 'gulp-jdists';
/**
 * 创建异常对象
 *
 * @param {GulpFile} file 当前文件对象
 * @param {string} err 异常信息
 * @return {PluginError} 返回异常对象
 */
function createError(file, err) {
  return new PluginError(pluginName, file.path + ': ' + err, {
    fileName: file.path,
    showStack: false
  });
}
/**
 * 处理 jdists 任务
 *
 * @param {Object} options 配置项
 * @return {Object} 返回 gulp 任务处理器对象
 */
function gulpJdists(options) {
  options = options || {};
  return through.obj(function (file, enc, callback) {
    if (file.isStream()) {
      return callback(createError(file, 'Streaming not supported'));
    }
    if (file.isBuffer()) {
      var contents = jdists.build(file.contents, {
        remove: options.remove,
        trigger: options.trigger,
        config: options.config,
        clean: options.clean,
        fromString: true,
        path: file.path
      });
      file.contents = new Buffer(contents);
    }
    return callback(null, file);
  });
}
module.exports = gulpJdists;