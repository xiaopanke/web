var path = require('path'),
  webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  BomPlugin = require('webpack-utf8-bom'),
  fs = require('fs'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  WebpackMd5Hash = require('webpack-md5-hash')

/*
 * 指定项目名
 */
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

const buildEntry = function() {
  let entryPathes = [`./src/${featureName}/pages`]
  let ret = {};
  for (let entryPath of entryPathes) {
    let dir = path.join(__dirname, entryPath);
    let entries = fs.readdirSync(dir);
    entries.forEach(entry => {
      ret[path.basename(entry, '.js')] = `${entryPath}/${entry}`
    });
  }
  return ret;
}

const buildHTML = function() {
  let dir = path.join(__dirname, `src/${featureName}/pages`);
  let entries = fs.readdirSync(dir);
  return entries.map(entry => {
    let basename = path.basename(entry, '.js');
    return new HtmlWebpackPlugin({
      filename: `${featureName}/${basename}.html`,
      template: `./src/${featureName}/index.html`,
      chunks: ['vendor', basename],
      inject: 'true'
    })
  });
}

module.exports = {
  entry: Object.assign({
    vendor: ['vue', 'vue-router', 'vuex', 'babel-polyfill']
  }, buildEntry()),
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: process.env.NODE_ENV == 'production' ?
      `//i0.jrjimg.cn/assets/` : '/dist/',
    filename: process.env.NODE_ENV == 'production' ? featureName + '/[name].[chunkhash:12].js' : featureName + '/[name].js'
  },
  resolve: {
    extensions: [
      '.vue', '.js'
    ],
    modules: ["node_modules"],
    alias: {
      vue: 'vue/dist/vue.min.js',
      components: __dirname + '/src/components/',
      assets: __dirname + '/src/assets/',
      stores: __dirname + '/src/stores/',
      utils: __dirname + '/src/utils'
    }
  },
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.(js|vue)$/,
      exclude: /(node_modules|plugins)/,
      loader: 'eslint-loader',
      options: {
        fix: true
      }
    }, {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: process.env.NODE_ENV == 'production' ? {
          css: ExtractTextPlugin.extract({
            use: 'css-loader',
            fallback: 'vue-style-loader'
          })
        } : null
      }
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
        name: featureName + '/images/[name].[ext]'
      }
    }]
  },
  devServer: {
    historyApiFallback: {
      index: `/dist/${featureName}/`
    },
    host: '0.0.0.0',
    port: port,
    disableHostCheck: true
  }
}

module.exports.plugins = buildHTML().concat([
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: process.env.NODE_ENV === 'production' ? featureName + '/vendors.[chunkhash:12].js' : featureName + '/vendors.js',
    minChunks: function(module, count) {
      return false
    },
    minify: {
      removeComments: true,
      collapseWhitespace: false
    }
  }),
  new WebpackMd5Hash(),
  new webpack.LoaderOptionsPlugin({
    options: {
      vue: {
        autoprefixer: {
          browsers: ['> 5%']
        }
      }
    }
  }),
  new webpack.HashedModuleIdsPlugin()
]);
if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new BomPlugin(true),
    new ExtractTextPlugin(featureName + "/[name].[chunkhash:12].css")
  ]);
} else {
  module.exports.devtool = 'cheap-source-map'
}
