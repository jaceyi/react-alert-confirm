const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'sass-loader'
          ]
        })
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin('index.css'),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new OptimizeCssAssetsPlugin ({
      assetNameRegExp: /\.(sa|sc|c)ss$/g,
      cssProcessor: require('cssnano'),

      cssProcessorPluginOptions: {
        preset: ['default', {
          discardComments: { removeAll: true},
          normalizeUnicode: false
        }]
      },
      canPrint: false
    }),
  ],

  externals: {
    'react': 'react',
    'react-dom': 'react-dom'
  }
};
