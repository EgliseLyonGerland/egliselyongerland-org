const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");

const createStyleLoaders = ({
  modules = true,
  exclude = null,
  include = null
}) => ({
  client: {
    test: /\.s?css$/,
    ...(exclude ? { exclude } : {}),
    ...(include ? { include } : {}),
    use: [
      ExtractCssChunks.loader,
      {
        loader: "css-loader",
        options: {
          camelCase: true,
          modules,
          importLoaders: 1,
          sourceMap: true,
          localIdentName: "[name]__[local]--[hash:base64:5]"
        }
      },
      {
        loader: "postcss-loader",
        options: {
          sourceMap: true
        }
      },
      {
        loader: "sass-loader"
      }
    ]
  },
  server: {
    test: /\.s?css$/,
    ...(exclude ? { exclude } : {}),
    ...(include ? { include } : {}),
    use: [
      {
        loader: "css-loader/locals",
        options: {
          camelCase: true,
          importLoaders: 1,
          modules,
          localIdentName: "[name]__[local]--[hash:base64:5]"
        }
      },
      {
        loader: "postcss-loader",
        options: {
          sourceMap: true
        }
      },
      {
        loader: "sass-loader"
      }
    ]
  }
});

const babelLoader = {
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  loader: "babel-loader"
};

const styleLoaders = createStyleLoaders({ exclude: /node_modules/ });
const styleThemeLoaders = createStyleLoaders({ modules: false, include: /theme/ });

const urlLoaderClient = {
  test: /\.(png|jpe?g|gif|svg)$/,
  loader: require.resolve("url-loader"),
  options: {
    limit: 2048,
    name: "assets/[name].[hash:8].[ext]"
  }
};

const urlLoaderServer = {
  ...urlLoaderClient,
  options: {
    ...urlLoaderClient.options,
    emitFile: false
  }
};

const fileLoaderClient = {
  exclude: [/\.(js|css|mjs|html|json)$/],
  use: [
    {
      loader: "file-loader",
      options: {
        name: "assets/[name].[hash:8].[ext]"
      }
    }
  ]
};

const fileLoaderServer = {
  exclude: [/\.(js|css|mjs|html|json)$/],
  use: [
    {
      loader: "file-loader",
      options: {
        name: "assets/[name].[hash:8].[ext]",
        emitFile: false
      }
    }
  ]
};

// Write css files from node_modules to its own vendor.css file
const externalCssLoaderClient = {
  test: /\.css$/,
  include: /node_modules/,
  use: [ExtractCssChunks.loader, "css-loader"]
};

// Server build needs a loader to handle external .css files
const externalCssLoaderServer = {
  test: /\.css$/,
  include: /node_modules/,
  loader: "css-loader/locals"
};

const client = [
  {
    oneOf: [
      babelLoader,
      styleThemeLoaders.client,
      styleLoaders.client,
      urlLoaderClient,
      fileLoaderClient,
      externalCssLoaderClient
    ]
  }
];
const server = [
  {
    oneOf: [
      babelLoader,
      styleThemeLoaders.server,
      styleLoaders.server,
      urlLoaderServer,
      fileLoaderServer,
      externalCssLoaderServer
    ]
  }
];

module.exports = {
  client,
  server
};
