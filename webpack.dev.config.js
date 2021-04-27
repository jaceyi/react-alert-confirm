const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',

  entry: './dev',

  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },

  devtool: 'inline-source-map',

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader'
      },
      {
        test: /\.(css)$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('', 'dev/index.html')
    })
  ],

  devServer: {
    inline: true,
    historyApiFallback: true,
    progress: true,
    overlay: {
      warnings: true,
      errors: true
    },
    port: 8080
  }
};
