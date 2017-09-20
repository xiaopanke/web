const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const webpack = require('webpack');
const baseConfig = require('./webpack.config.js')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const path = require('path');
const fs = require('fs');

let featureName = 'demo';
let port = 8080;
process.argv.some(function(arg) {
  let arr = arg.match(/\-\-env=([a-zA-Z0-9\-_,]+)/);
  if (arr) {
    let config = arr[1].split(',');
    featureName = config[0];
    if (config[1]) {
      port = config[1];
    }
  }
});

module.exports = merge({}, {
  // Point entry to your app's server entry file
  entry: {
    index: `./src/${featureName}/server/index.js`
  },

  // This allows webpack to handle dynamic imports in a Node-appropriate
  // fashion, and also tells `vue-loader` to emit server-oriented code when
  // compiling Vue components.
  target: 'node',

  // For bundle renderer source map support
  devtool: false,

  // This tells the server bundle to use Node-style exports
  output: {
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2',
    filename: featureName + '/server' + '/[name].js'
  },
  resolve: {
    extensions: [
      '.vue', '.js'
    ],
    modules: ["node_modules"],
    alias: {
      utils: __dirname + '/src/utils/',
      vue: 'vue/dist/vue.min.js',
      components: __dirname + '/src/components/',
      stores: __dirname + '/src/stores/',
      assets: __dirname + '/src/assets/'
    }
  },
  node: {
    __filename: true,
    __dirname: true
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader'
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      options: {
        presets: [
          'es2015', 'stage-0'
        ],
        plugins: ['transform-runtime']
      }
    }, {
      test: /\.html$/,
      loader: 'vue-html-loader'
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'url-loader',
      query: {
        limit: 15000,
        name: '/images/[name].[ext]?[hash]'
      }
    }]
  },

  // https://webpack.js.org/configuration/externals/#function
  // https://github.com/liady/webpack-node-externals
  // Externalize app dependencies. This makes the server build much faster
  // and generates a smaller bundle file.
  externals: [nodeExternals()],

  // This is the plugin that turns the entire output of the server build
  // into a single JSON file. The default file name will be
  // `vue-ssr-server-bundle.json`
  plugins: [
    new webpack.DefinePlugin({
      'PORT': port
    })
  ]
})