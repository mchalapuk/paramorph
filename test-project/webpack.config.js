const path = require('path');

const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const ExternalReact = require('webpack-external-react');

const { JSDOM } = require('jsdom');

const React = require('react');
const ReactDOM = require('react-dom');
const ReactDOMServer = require('react-dom/server');
const ReactRouterDOM = require('react-router-dom');

const Root = require('paramorph/components/Root')
  .Root;

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

  target: 'web',

  resolve: {
    extensions: [
      '.js', '.tsx', '.ts', '.css', '.markdown'
    ],
    alias: {
      'includes': path.resolve(__dirname, './_includes/'),
    },
  },

  externals: ExternalReact.externals,

  module: {
    noParse: ExternalReact.noParse,
    rules: [
      {
        test: path.resolve(__dirname, './_config.yml'),
        use: 'paramorph/loader',
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        use: 'source-map-loader',
      },
      {
        test: /\.tsx?$/,
        use: [
          'babel-loader',
          'ts-loader',
        ],
      },
      {
        test: /\.markdown$/,
        use: [
          'babel-loader',
          'paramorph/loaders/add-data-to-globals?data=includes',
          'paramorph/loaders/wrap-with-jsx?field=body',
          'paramorph/loaders/markdown?html=true&xhtmlOut=true&linkify=true&typographer=true',
          'json-loader',
          'front-matter-loader',
        ],
      },
    ],
  },

  plugins: [
    new StaticSiteGeneratorPlugin({
      entry: 'entry',

      paths: [
        '/',
      ],

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

      globals: newFakeBrowserGlobals(),
    }),
  ],
};

function newFakeBrowserGlobals() {
  const window = new JSDOM().window;
  const self = window;
  const document = window.document;

  self.window = window;
  Object.defineProperty(document, 'readyState', {
    value: 'server-side',
  });

  return {
    self,
    window,
    document,
    React,
    ReactDOM,
    ReactDOMServer,
    ReactRouterDOM,
  };
}

