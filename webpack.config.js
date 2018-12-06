const path = require('path');

module.exports = {
  entry: ['babel-polyfill', './src'],

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].min.js'
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
};
