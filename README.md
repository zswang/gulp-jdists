# gulp-jdists [![Build Status](https://img.shields.io/travis/zswang/gulp-jdists/master.svg)](https://travis-ci.org/zswang/gulp-jdists) [![NPM version](https://img.shields.io/npm/v/gulp-jdists.svg)](http://badge.fury.io/js/gulp-jdists)

> Code block processing with [jdists](https://github.com/zswang/jdists).

## Installation

Install package with NPM and add it to your development dependencies:

`npm install --save-dev gulp-jdists`

## Usage

```javascript
var jdists = require('gulp-jdists');

gulp.task('dist', function() {
  return gulp.src('lib/*.js')
    .pipe(jdists())
    .pipe(gulp.dest('dist'));
});
```

## Options

- `remove`

	Remove block tag name list (default "remove,test")

- `trigger`

	Trigger name list (default "release")

- `config`

	Path to config file (default ".jdistsrc")

MIT © [zswang](http://weibo.com/zswang)