import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as path from 'path';
import * as webpack from 'webpack';
import * as merge from 'webpack-merge';
import * as ParallelUglifyPlugin from 'webpack-parallel-uglify-plugin';
import * as LodashModuleReplacementPlugin from 'lodash-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import analyConfig from './analyconfig';
import config from './webpack.config.base';

const ROOTPATH: string = path.join(__dirname, '../src/pages');

export default merge(config, {
  plugins: [
    new LodashModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(ROOTPATH, './template/index.ejs'),
      filename: 'index.html',
      isDev: false
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ParallelUglifyPlugin({
      cacheDir: '.cache/',
      uglifyJS: {
        output: {
          comments: false
        },
        compress: {
          warnings: false
        }
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV:  JSON.stringify('production')}
    }),
    new BundleAnalyzerPlugin(analyConfig)
  ]
});
