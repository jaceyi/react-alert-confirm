const path = require('path');

module.exports = {
  entry: ['./src'],

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: 'alert-confirm',
    libraryTarget: 'umd'
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(css)$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },

  externals: {
    react: 'react',
    'react-dom': 'react-dom'
  }
};