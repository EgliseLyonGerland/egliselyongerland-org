const postcssImportPlugin = require('postcss-import');
const postcssNestedPlugin = require('postcss-nested');
const postcssCustomPropertiesPlugin = require('postcss-custom-properties');
const postcssFlexbugsFixesPlugin = require('postcss-flexbugs-fixes');
const autoprefixerPlugin = require('autoprefixer');
const postcssAssetsPlugin = require('postcss-assets');
const postcssNormalizePlugin = require('postcss-normalize');

const paths = require('./webpack/paths');

module.exports = {
  plugins: [
    postcssImportPlugin({
      path: [paths.srcShared],
    }),
    postcssNestedPlugin(),
    postcssCustomPropertiesPlugin(),
    postcssFlexbugsFixesPlugin(),
    autoprefixerPlugin(),
    postcssAssetsPlugin({
      basePath: './assets',
    }),
    postcssNormalizePlugin(),
  ],
  sourceMap: true,
};
