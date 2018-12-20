
const webpack = require('webpack');
const ReactHtmlPlugin = require('react-html-webpack-plugin');
const path = require('path');

const config = require('./webpack.config');

module.exports = {
  mode: 'development',

  entry: Object.assign({}, config.entry, {
    'hot-bootstrap': [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
    ],
  }),

  output: {
    chunkFilename: '[id].bundle.js',
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './build'),
    publicPath: path.resolve(__dirname, '/'),
    libraryTarget: 'umd',
  },

  target: config.target,
  devtool: 'eval-source-map',
  resolve: config.resolve,
  resolveLoader: config.resolveLoader,
  externals: config.externals,

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    hot: true,
    open: true,
    overlay: {
      warnings: true,
      errors: true,
    },
    watchOptions: {
      poll: true
    },
  },

  module: {
    noParse: config.module.noParse,
    rules: config.module.rules,
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ReactHtmlPlugin({
      component: 'paramorph/components/Root',
      output: 'index.html',
      props: {
        paramorph: {
          config: {
            title: 'Paramorph',
            baseUrl: 'http://localhost:8080',
            locale: 'pl_PL',
          },
        },
        page: {
          title: 'Feed',
          tags: [],
          description: '',
          url: '/',
          image: null,
        },
        localBundles: {
          js: [
            'hot-bootstrap.bundle.js',
            'entry.bundle.js',
          ],
          css: [],
        },
        externalBundles: {
          js: [
            'https://unpkg.com/react@15/dist/react.js',
            'https://unpkg.com/prop-types@15.6.0/prop-types.min.js',
            'https://unpkg.com/react-dom@15/dist/react-dom.js',
            'https://unpkg.com/react-dom@15.6.1/dist/react-dom-server.min.js',
            'https://unpkg.com/react-router-dom@4.1.2/umd/react-router-dom.js',
          ],
          css: [],
        },
      },
      globals: {
        window: {},
      },
    }),
  ],
};

