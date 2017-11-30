import { server } from 'electron-connect';
import * as gulp from 'gulp';
import * as mocha from 'gulp-mocha';
import * as rename from 'gulp-rename';
import * as run from 'gulp-run';
import tslint from 'gulp-tslint';
import * as ts from 'gulp-typescript';
import * as webpack from 'webpack-stream';
import devConfig from './config/webpack.config.dev';
import buildConfig from './config/webpack.config.build';

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
    .pipe(tslint({fix: true}))
    .pipe(tslint.report());
});

// 页面编译
gulp.task('pages:dev', () => {
  return gulp.src('./src/pages/index.tsx')
    .pipe(webpack(devConfig))
    .pipe(gulp.dest('./app/pages'));
});

gulp.task('pages:build', () => {
  return gulp.src('./src/pages/index.tsx')
    .pipe(webpack(buildConfig))
    .pipe(gulp.dest('./app/pages'));
});

// 开发
gulp.task('dev', ['lint', 'test', 'compile', 'pages:dev'], () => {
  electron.start();

  gulp.watch(['./src/**/*.ts', '!./src/pages/**'], ['lint', 'test', 'compile']);
  gulp.watch(['./app/**/*.js', '!./app/pages/**'], electron.restart);
  gulp.watch(['./src/pages/**'], ['pages:dev']);
  gulp.watch(['./app/pages/**'], electron.reload);
});

// 上线
gulp.task('build', ['lint', 'test', 'compile', 'pages:build'], () => {
  console.log('编译完成');
});
