const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
  mode: 'development',

  entry: './test/index.js',

  resolve: {
    extensions: ['.js', '.jsx']
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(scss)$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('', 'test/index.html')
    }),
    new FriendlyErrorsPlugin()
  ],

  devServer: {
    inline: true,
    historyApiFallback: true,
    contentBase: '../test',
    progress: true,
    overlay: {
      warnings: true,
      errors: true
    },
    port: 8000
  }
};
