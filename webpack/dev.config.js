require("babel-polyfill");

// Webpack config for development
var fs = require("fs");
var path = require("path");
var webpack = require("webpack");
var assetsPath = path.resolve(__dirname, "../static/dist");
var host = process.env.HOST || "localhost";
var port = +process.env.PORT + 1 || 3001;

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
var WebpackIsomorphicToolsPlugin = require("webpack-isomorphic-tools/plugin");
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(
  require("./webpack-isomorphic-tools")
).development();

module.exports = {
  devtool: "inline-source-map",
  context: path.resolve(__dirname, ".."),
  entry: {
    main: [
      `webpack-hot-middleware/client?path=http://${host}:${port}/__webpack_hmr`,
      'react-hot-loader/patch',
      "font-awesome-sass-loader!./src/theme/font-awesome.config.js",
      "./src/client.js"
    ]
  },
  output: {
    path: assetsPath,
    filename: "[name]-[hash].js",
    chunkFilename: "[name]-[chunkhash].js",
    publicPath: "http://" + host + ":" + port + "/dist/"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      // Non-module css
      {
        test: /\.scss$/,
        include: /theme/,
        use: [
          "style-loader",
          "css-loader?importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]",
          "autoprefixer-loader?browsers=last 2 version",
          "sass-loader?outputStyle=expanded&sourceMap"
        ]
      },
      {
        test: /\.scss$/,
        exclude: /theme/,
        use: [
          "style-loader",
          "css-loader?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]",
          "autoprefixer-loader?browsers=last 2 version",
          "sass-loader?outputStyle=expanded&sourceMap"
        ]
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
    // hot reload
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/webpack-stats\.json$/),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true // <-------- DISABLE redux-devtools HERE
    }),
    webpackIsomorphicToolsPlugin
  ]
};
