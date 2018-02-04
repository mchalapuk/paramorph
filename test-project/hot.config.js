const webpack = require('webpack');
const ReactHtmlPlugin = require('react-html-webpack-plugin');
const path = require('path');

const config = require('./webpack.config');

const HOT_ENTRY = [
  'react-hot-loader/patch',
  'webpack-dev-server/client?http://localhost:8080',
  'webpack/hot/only-dev-server',
];

const HOT_BABEL = {
  loader: 'babel-loader',
  options: {
    plugins: [ 'react-hot-loader/babel' ],
  },
};

module.exports = {
  entry: Object.assign({}, config.entry, {
    'hot-bootstrap': HOT_ENTRY,
  }),

  output: {
    chunkFilename: '[id].bundle.js',
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './build'),
    publicPath: path.resolve(__dirname, '/'),
    libraryTarget: 'umd',
  },

  devtool: config.devtool,
  target: config.target,
  resolve: config.resolve,
  resolveLoader: config.resolveLoader,
  externals: config.externals,

  module: {
    noParse: config.module.noParse,
    rules: config.module.rules.map(rule => {
      if (rule.use instanceof Array && rule.use[0] === 'babel-loader') {
        rule.use[0] = HOT_BABEL;
      } else if (rule.use === 'babel-loader') {
        rule.use = HOT_BABEL;
      }
      return rule;
    }),
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ReactHtmlPlugin({
      component: 'paramorph/components/Root',
      output: 'index.html',
      props: {
        website: {
          title: 'Paramorph',
          baseUrl: 'http://localhost:8080',
          locale: 'pl_PL',
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

