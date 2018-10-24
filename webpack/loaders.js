const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const babelClientConfig = require('./babel.client');
const babelServerConfig = require('./babel.server');

const createStyleLoaders = ({
  modules = true,
  exclude = null,
  include = null,
}) => ({
  client: {
    test: /\.s?css$/,
    ...(exclude ? { exclude } : {}),
    ...(include ? { include } : {}),
    use: [
      ExtractCssChunks.loader,
      {
        loader: 'css-loader',
        options: {
          camelCase: true,
          modules,
          importLoaders: 1,
          sourceMap: true,
          localIdentName: '[name]__[local]--[hash:base64:5]',
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
        },
      },
      {
        loader: 'sass-loader',
      },
    ],
  },
  server: {
    test: /\.s?css$/,
    ...(exclude ? { exclude } : {}),
    ...(include ? { include } : {}),
    use: [
      {
        loader: 'css-loader/locals',
        options: {
          camelCase: true,
          importLoaders: 1,
          modules,
          localIdentName: '[name]__[local]--[hash:base64:5]',
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
        },
      },
      {
        loader: 'sass-loader',
      },
    ],
  },
});

const createImageLoader = side => ({
  test: /\.(png|jpe?g|gif|svg)$/,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: 'assets/[name].[hash:8].[ext]',
        ...(side === 'server' ? { emitFile: false } : {}),
      },
    },
    {
      loader: 'image-webpack-loader',
      options: {
        mozjpeg: {
          enabled: false,
          progressive: true,
          quality: 65,
        },
        optipng: {
          enabled: false,
        },
        pngquant: {
          quality: '65-90',
          speed: 4,
        },
        gifsicle: {
          interlaced: false,
        },
      },
    },
  ],
});

const createScriptLoader = side => ({
  exclude: [/\.(js|css|mjs|html|json)$/],
  use: [
    {
      loader: 'file-loader',
      options: {
        name: 'assets/[name].[hash:8].[ext]',
        ...(side === 'server' ? { emitFile: false } : {}),
      },
    },
  ],
});

const babelLoader = {
  client: {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: babelClientConfig,
    },
  },
  server: {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: babelServerConfig,
    },
  },
};

const styleLoaders = createStyleLoaders({ exclude: /node_modules/ });

const styleThemeLoaders = createStyleLoaders({
  modules: false,
  include: /theme/,
});

const imageLoader = {
  client: createImageLoader('client'),
  server: createImageLoader('server'),
};

const scriptLoader = {
  client: createScriptLoader('client'),
  server: createScriptLoader('server'),
};

const externalCssLoader = {
  // Write css files from node_modules to its own vendor.css file
  client: {
    test: /\.css$/,
    include: /node_modules/,
    use: [ExtractCssChunks.loader, 'css-loader'],
  },

  // Server build needs a loader to handle external .css files
  server: {
    test: /\.css$/,
    include: /node_modules/,
    loader: 'css-loader/locals',
  },
};

const client = [
  {
    oneOf: [
      babelLoader.client,
      styleThemeLoaders.client,
      styleLoaders.client,
      imageLoader.client,
      scriptLoader.client,
      externalCssLoader.client,
    ],
  },
];

const server = [
  {
    oneOf: [
      babelLoader.server,
      styleThemeLoaders.server,
      styleLoaders.server,
      imageLoader.server,
      scriptLoader.server,
      externalCssLoader.server,
    ],
  },
];

module.exports = {
  client,
  server,
};
