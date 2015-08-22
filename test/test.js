'use strict';

var jdists = require('../');
var gutil = require('gulp-util');
var should = require('should');
var fs = require('fs');

function generateFile(contents) {
  contents = contents || '';

  return new gutil.File({
    path: './testfile.js',
    cwd: './',
    base: './',
    contents: new Buffer(contents)
  });
}

function expect_equals(options, input, output, done) {
  var stream = jdists(options);

  stream.on('data', function (file) {
    String(file.contents).should.equal(output);
    done();
  });

  stream.write(generateFile(input));
  stream.end();
}

describe('gulp-jdists', function () {
  describe('base64 encoding', function () {
    var input = '(*<jdists encoding="base64">hello</jdists>*)';
    var output = new Buffer('hello').toString('base64');

    it('does nothing', function (done) {
      expect_equals({}, input, output, done);
    });
  });

  describe('jfogs encoding', function () {
    var input = '(*<jdists encoding="jfogs">function hello() { console.log("hello"); }</jdists>*)';
    var output = '\n' +
      '(function ($fog$0, $fog$1) {\n' +
      '  function hello() { console[$fog$0]($fog$1); }\n' +
      '})("log", "hello");\n';

    it('does nothing', function (done) {
      expect_equals({}, input, output, done);
    });
  });

  describe('Streaming not supported', function () {
    it('does nothing', function (done) {
      var file = new gutil.File({
        path: 'test/fixtures/hello.js',
        cwd: 'test',
        base: 'test/fixtures',
        contents: new fs.createReadStream('test/fixtures/hello.js')
      });
      var stream = jdists({});
      stream.on('error', function (err) {
        done();
      });
      stream.write(file);
      stream.end();
    });
  });

  describe('null', function () {
    it('does nothing', function (done) {
      var file = new gutil.File({
        contents: null
      });
      var stream = jdists();
      stream.on('data', function (file) {
        done();
      });
      stream.write(file);
      stream.end();
    });
  });
});