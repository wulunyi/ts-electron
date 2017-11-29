import * as HappyPack from 'happypack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as path from 'path';
import * as webpack from 'webpack';

let happyThreadPool = HappyPack.ThreadPool({size: 5});

const ROOTPATH: string = path.join(__dirname, '../src/pages');
const DISTPATH: string = path.join(__dirname, '../app/pages');

export default {
  entry: {
    index: path.join(ROOTPATH, 'index.tsx')
  },

  target: 'electron',

  output: {
    filename: 'index.js',
    path: DISTPATH
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'happypack/loader?id=lint',
        enforce: 'pre',
        exclude: /node_modules/,
        include: /src/,
      },

      {
        test: /\.(ts|tsx)$/,
        use: ['happypack/loader?id=babel', 'awesome-typescript-loader'],
        include: /src/,
        exclude: /node_modules/
      },

      {
        test: /\.scss$/,
        use: 'happypack/loader?id=scss',
        exclude: /node_modules/,
        include: /src/
      },

      {
        test: /\.(png|jpg|gif)$/,
        use: 'file-loader?limit=8192&name=./iamges/[name]_[hash:base64:5].[ext]',
        exclude: /node_modules/
      }
    ]
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.scss'],
    modules   : ['node_modules']
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(ROOTPATH, './template/index.html'),
      filename: 'index.html'
    }),
    new HappyPack({
      id: 'lint',
      loaders: ['tslint-loader'],
      threadPool: happyThreadPool,
      cache: true,
      verbose: true
    }),
    new HappyPack({
      id: 'babel',
      loaders: ['babel-loader'],
      threadPool: happyThreadPool,
      cache: true,
      verbose: true
    }),
    new HappyPack({
      id: 'scss',
      loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      threadPool: happyThreadPool,
      cache: true,
      verbose: true
    })
  ]
};
