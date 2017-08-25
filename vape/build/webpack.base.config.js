const ExtractTextPlugin    = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const ModuleBuilder        = require('./webpack-plugins/ModuleBuilder')
const path                 = require('path')
const vueConfig            = require('./vue-loader.config')
const webpack              = require('webpack')
const isProd               = process.env.NODE_ENV === 'production'

module.exports = {
  devtool: isProd
    ? false
    : '#cheap-module-source-map',
  output: {
    path: path.resolve('./vape/dist'),
    publicPath: '/dist/',
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    modules: [
      path.resolve('./'),
      path.resolve('./node_modules')
    ],
    alias: {
      vue: 'vue/dist/vue.js', // compile templates on the fly
      'public': path.resolve('./public')
    }
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueConfig
      },
      {
        test: /\.scss$/,
        loader: isProd
          ? ExtractTextPlugin.extract({
              fallback: "style-loader",
              use: "css-loader!sass-loader",
            })
          : [ 'vue-style-loader', 'css-loader', 'sass-loader' ]
      },
      {
        test: /\.styl/,
        loaders: [ 'vue-style-loader', 'css-loader', 'stylus-loader' ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.css$/,
        use: isProd
          ? ExtractTextPlugin.extract({
              use: 'css-loader?minimize',
              fallback: 'vue-style-loader'
            })
          : ['vue-style-loader', 'css-loader']
      }
    ]
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: isProd ? 'warning' : false
  },
  plugins: isProd
    ? [
        new webpack.optimize.UglifyJsPlugin({
          compress: { warnings: false }
        }),
        new ExtractTextPlugin({
          filename: 'common.[chunkhash].css'
        }),
        new ModuleBuilder({ folders: [
          './components',
          './layouts',
          './plugins',
          './templates',
        ] })
      ]
    : [
        new FriendlyErrorsPlugin(),
        new ExtractTextPlugin({
          filename: 'common.[chunkhash].css'
        }),
      ]
}
