const path = require('path');

module.exports = {
  mode: 'production',

  entry: './src',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: 'react-alert-confirm',
    libraryTarget: 'umd'
  },

  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
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

  externals: {
    react: 'react',
    'react-dom': 'react-dom'
  }
};
