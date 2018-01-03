require("babel-polyfill");

// Webpack config for creating the production bundle.
var path = require("path");
var webpack = require("webpack");
var CleanPlugin = require("clean-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var projectRootPath = path.resolve(__dirname, "../");
var assetsPath = path.resolve(projectRootPath, "./static/dist");

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
var WebpackIsomorphicToolsPlugin = require("webpack-isomorphic-tools/plugin");
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(
  require("./webpack-isomorphic-tools")
);

module.exports = {
  devtool: "source-map",
  context: path.resolve(__dirname, ".."),
  entry: {
    main: [
      "font-awesome-sass-loader!./src/theme/font-awesome.config.prod.js",
      "./src/client.js"
    ]
  },
  output: {
    path: assetsPath,
    filename: "[name]-[chunkhash].js",
    chunkFilename: "[name]-[chunkhash].js",
    publicPath: "/dist/"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      // Non-module css
      {
        test: /\.scss$/,
        include: /theme/,
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            "css-loader?importLoaders=2&sourceMap",
            "autoprefixer-loader?browsers=last 2 version",
            "sass-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true"
          ]
        })
      },
      // Module css
      {
        test: /\.scss$/,
        exclude: /theme/,
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            "css-loader?modules&importLoaders=2&sourceMap",
            "autoprefixer-loader?browsers=last 2 version",
            "sass-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true"
          ]
        })
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=application/octet-stream"
      },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=image/svg+xml"
      },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression("images"),
        loader: "url-loader?limit=10240"
      }
    ]
  },
  resolve: {
    modules: ["src", "node_modules"],
    extensions: [".json", ".js", ".jsx"]
  },
  plugins: [
    new CleanPlugin([assetsPath], { root: projectRootPath }),

    // css files from the extract-text-plugin loader
    new ExtractTextPlugin({
      filename: "[name]-[chunkhash].css",
      allChunks: true
    }),

    new webpack.DefinePlugin({
      "process.env.NODE_ENV": '"production"',
      "process.env.HOST": process.env.HOST ? `"${process.env.HOST}"` : null,

      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false
    }),

    // ignore dev config
    new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),

    // optimizations
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    }),

    webpackIsomorphicToolsPlugin
  ]
};
