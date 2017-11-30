import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as path from 'path';
import * as merge from 'webpack-merge';

import config from './webpack.config.base';

const ROOTPATH: string = path.join(__dirname, '../src/pages');

export default merge(config, {
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(ROOTPATH, './template/index.ejs'),
      filename: 'index.html',
      isDev: true
    })
  ]
});
