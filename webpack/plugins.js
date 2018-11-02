const path = require('path');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const { ReactLoadablePlugin } = require('react-loadable/webpack');

const env = require('./env')();

const shared = [];

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
  new ReactLoadablePlugin({
    filename: path.join(__dirname, `../build/client/react-loadable.json`),
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
