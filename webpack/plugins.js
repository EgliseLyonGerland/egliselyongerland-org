const path = require('path');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin');

const env = require('./env')();

const shared = [
  new ReplaceInFileWebpackPlugin([
    {
      dir: path.join(__dirname, '../node_modules/@material-ui/core/styles'),
      files: ['createBreakpoints.js'],
      rules: [
        {
          search: "var keys = ['xs', 'sm', 'md', 'lg', 'xl'];",
          replace: "var keys = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'];",
        },
      ],
    },
  ]),
];

const client = [
  new webpack.DefinePlugin(env.stringified),
  new webpack.DefinePlugin({
    __SERVER__: 'false',
    __CLIENT__: 'true',
    __DEVELOPMENT__: process.env.NODE_ENV === 'development',
  }),
  new ExtractCssChunks({
    filename:
      process.env.NODE_ENV === 'development'
        ? '[name].css'
        : '[name].[contenthash].css',
    chunkFilename:
      process.env.NODE_ENV === 'development'
        ? '[id].css'
        : '[id].[contenthash].css',
    hot: process.env.NODE_ENV === 'development',
  }),
  new ManifestPlugin({ fileName: 'manifest.json' }),
];

const server = [
  new webpack.DefinePlugin({
    __SERVER__: 'true',
    __CLIENT__: 'false',
    __DEVELOPMENT__: process.env.NODE_ENV === 'development',
  }),
];

module.exports = {
  shared,
  client,
  server,
};
