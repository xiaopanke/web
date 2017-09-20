//rimraf ./dist && 

var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
   entry: {
    groupOrder: './src/main.js',
    //groupOrderGen: './src/main_g.js',
    vendor: ['vue']
  },
  output: {
    path: path.resolve(__dirname, './dist/'),
    publicPath: process.env.NODE_ENV === 'production' ? 'http://i0.jrjimg.cn/itougu-web/group_order/' : '/dist/',
    //publicPath: process.env.NODE_ENV === 'production' ? './' : '/dist/',
    filename: '[name].[chunkhash:12].js',
    // filename: 'build.js',
    chunkFilename: '[id].[chunkhash:12].js'
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules'),
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
            presets: ['es2015']
        }
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url',
        query: {
          limit: 15000,
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  vue: {
    // configure autoprefixer
    autoprefixer: {
      browsers: ['> 5%']
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  devtool: '#eval-source-map'
};

module.exports.plugins = [
    new webpack.optimize.CommonsChunkPlugin('vendor','vendor.js'),
    new HtmlWebpackPlugin(
      module.exports.entry.groupOrder ? 
      {
        template: 'src/group.html',
        filename: 'group-order.html',
        inject: 'true'
      }
      :
      {
        template: 'src/group_g.html',
        filename: 'group-order-gen.html',
        inject: 'true'
      }
    )
];

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'

  //http://vuejs.github.io/vue-loader/workflow/production.html
  // module.exports.vue.loaders = {
  //   // http://vuejs.github.io/vue-loader/configurations/extract-css.html
  //   css: ExtractTextPlugin.extract('css')
  // }

  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: false
    }),

    new webpack.optimize.OccurenceOrderPlugin()

    // new ExtractTextPlugin('[name].[contenthash:12].css')

  ])

}