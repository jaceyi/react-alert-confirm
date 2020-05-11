const path = require('path');
const webpack = require('webpack');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
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
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      }
    ]
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new OptimizeCSSAssetsPlugin({
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: [
          'default',
          {
            discardComments: {
              removeAll: true
            }
          }
        ]
      },
      canPrint: true
    }),
    new MiniCssExtractPlugin({
      filename: 'index.css',
      ignoreOrder: true
    })
  ],

  externals: {
    'react': 'react',
    'react-dom': 'react-dom'
  }
};
