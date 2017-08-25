const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  // extractCSS: process.env.NODE_ENV === 'production',
  extractCSS: true,
  preserveWhitespace: false,
  postcss: [
    require('autoprefixer')({
    browsers: ['last 3 versions']
  })
  ],
  loaders: {
    css: ExtractTextPlugin.extract({
      use: 'css-loader',
      fallback: 'vue-style-loader' // <- this is a dep of vue-loader, so no need to explicitly install if using npm3
    }),
    'scss': 'vue-style-loader!css-loader!sass-loader',
    'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
    'stylus': 'vue-style-loader!css-loader!stylus-loader'
  }
}
