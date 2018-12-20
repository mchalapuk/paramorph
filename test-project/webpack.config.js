const path = require('path');

const IsomorphicHtmlPlugin = require('isomorphic-html-webpack-plugin');
const ExternalReact = require('webpack-external-react');

const { JSDOM, VirtualConsole } = require('jsdom');

const React = require('react');
const ReactDOM = require('react-dom');
const PropTypes = require('prop-types');
const ReactDOMServer = require('react-dom/server');
const ReactRouterDOM = require('react-router-dom');

const { Root } = require('paramorph/components/Root');

module.exports = {
	entry: {
    entry: [
      'paramorph/entry',
    ],
  },

  output: {
    chunkFilename: '[id]-[contenthash].bundle.js',
    filename: '[name]-[hash].bundle.js',
    path: path.resolve(__dirname, './_output'),
    libraryTarget: 'umd',
  },

  mode: 'development',
  target: 'web',
  devtool: 'source-map',

  resolve: {
    extensions: [
      '.js', '.tsx', '.ts', '.css', '.markdown', '.yml'
    ],
    alias: {
      '@website': path.resolve(__dirname),
    },
  },

  externals: ExternalReact.externals,

  module: {
    noParse: ExternalReact.noParse,
    rules: [
      {
        test: path.resolve(__dirname, './_config.yml'),
        use: 'paramorph/loader/config',
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        use: 'source-map-loader',
      },
      {
        test: /\.tsx?$/,
        use: [
          'ts-loader',
        ],
      },
      {
        test: /\.markdown$/,
        use: [
          'paramorph/loader/markdown',
        ],
      },
    ],
  },

  plugins: [
    new IsomorphicHtmlPlugin({
      entry: 'entry',

      locals: {
        Root,
        title: 'Paramorph',
        js: [
          'https://unpkg.com/react@15/dist/react.js',
          'https://unpkg.com/prop-types@15.6.0/prop-types.min.js',
          'https://unpkg.com/react-dom@15/dist/react-dom.js',
          'https://unpkg.com/react-dom@15.6.1/dist/react-dom-server.min.js',
          'https://unpkg.com/react-router-dom@4.1.2/umd/react-router-dom.js',
        ],
      },

      globals:  {
        React,
        PropTypes,
        ReactDOM,
        ReactDOMServer,
        ReactRouterDOM,
      },
    }),
  ],
};

