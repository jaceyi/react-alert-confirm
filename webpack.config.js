const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
        test: /\.scss$/,
        include: /src/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'index.css',
      ignoreOrder: true
    })
  ],

  externals: {
    react: 'react',
    'react-dom': 'react-dom'
  }
};
