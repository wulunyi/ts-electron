import * as gulp from 'gulp';
import * as ts from 'gulp-typescript';
import * as run from 'gulp-run';
import * as rename from 'gulp-rename';
import * as mocha from 'gulp-mocha';

// 测试
gulp.task('test', () => {
  return gulp.src('./test/**/*.test.ts')
    .pipe(mocha({
        reporter: 'spec',
        require: ['ts-node/register']
    }))
    .once('error', () => {
      process.exit(1);
    })
    .once('end', () => {
      process.exit();
    })
});

// 编译生成执行代码
gulp.task('compile', () => {
  gulp.src('./src/**/*.ts')
    .pipe(ts())
    .pipe(gulp.dest('./app'));
});
