import { server } from 'electron-connect';
import * as gulp from 'gulp';
import * as mocha from 'gulp-mocha';
import * as rename from 'gulp-rename';
import * as run from 'gulp-run';
import tslint from 'gulp-tslint';
import * as ts from 'gulp-typescript';
import * as webpack from 'webpack-stream';
import webpackConfig from './config/webpack.config.base';

const electron = server.create();

// 测试
gulp.task('test', () => {
  return gulp.src('./test/**/*.test.ts')
    .pipe(mocha({
        reporter: 'spec',
        require: ['ts-node/register']
    }));
});

// 编译生成执行代码
gulp.task('compile', ['lint', 'test'], () => {
  return gulp.src('./src/**/*.ts')
    .pipe(ts())
    .pipe(gulp.dest('./app'));
});

// 格式检查
gulp.task('lint', () => {
  return gulp.src('./src/**/*.ts')
    .pipe(tslint())
    .pipe(tslint.report());
});

gulp.task('pages', () => {
  return gulp.src('./src/pages/index.tsx')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('./app/pages'));
});

gulp.task('dev', ['lint', 'test', 'compile', 'pages'], () => {
  electron.start();

  gulp.watch(['./src/**/*.ts', '!./src/pages/**'], ['compile']);
  gulp.watch(['./app/**/*.js', '!./app/pages/**'], electron.restart);
  gulp.watch(['./src/pages/**'], ['pages']);
  gulp.watch(['./app/pages/**'], electron.reload);
});
