const webpack = require('webpack');
const nodemon = require('nodemon');
const rimraf = require('rimraf');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const express = require('express');
const webpackConfig = require('../webpack')(
  process.env.NODE_ENV || 'development',
);
const paths = require('../webpack/paths');
const { logMessage, compilerPromise } = require('./utils');

const app = express();

const WEBPACK_HOST = process.env.WEBPACK_HOST || 'localhost';
const [clientConfig, serverConfig] = webpackConfig;

const WEBPACK_PORT =
  process.env.WEBPACK_PORT ||
  (!Number.isNaN(Number(process.env.PORT))
    ? Number(process.env.PORT) + 1
    : 8501);

const start = async () => {
  rimraf.sync(paths.clientBuild);
  rimraf.sync(paths.serverBuild);

  clientConfig.entry.bundle = [
    `webpack-hot-middleware/client?path=http://${WEBPACK_HOST}:${WEBPACK_PORT}/__webpack_hmr`,
    ...clientConfig.entry.bundle,
  ];

  clientConfig.output.hotUpdateMainFilename = 'updates/[hash].hot-update.json';
  clientConfig.output.hotUpdateChunkFilename =
    'updates/[id].[hash].hot-update.js';

  const { publicPath } = clientConfig.output;

  clientConfig.output.publicPath = [
    `http://${WEBPACK_HOST}:${WEBPACK_PORT}`,
    publicPath,
  ]
    .join('/')
    .replace(/([^:+])\/+/g, '$1/');

  serverConfig.output.publicPath = [
    `http://${WEBPACK_HOST}:${WEBPACK_PORT}`,
    publicPath,
  ]
    .join('/')
    .replace(/([^:+])\/+/g, '$1/');

  try {
    // Client
    const clientCompiler = webpack(clientConfig);

    const watchOptions = {
      // poll: true,
      ignored: /node_modules/,
      stats: clientConfig.stats,
    };

    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      return next();
    });

    app.use(
      webpackDevMiddleware(clientCompiler, {
        publicPath: clientConfig.output.publicPath,
        stats: clientConfig.stats,
        watchOptions,
      }),
    );

    app.use(webpackHotMiddleware(clientCompiler));

    app.use('/static', express.static(paths.clientBuild));

    app.listen(WEBPACK_PORT);

    await compilerPromise(clientCompiler);

    // Server
    const serverCompiler = webpack(serverConfig);

    serverCompiler.watch(watchOptions, (error, stats) => {
      if (!error && !stats.hasErrors()) {
        console.log(stats.toString(serverConfig.stats));
        return;
      }

      if (error) {
        logMessage(error, 'error');
      }

      if (stats.hasErrors()) {
        const info = stats.toJson();
        const errors = info.errors[0].split('\n');
        logMessage(errors[0], 'error');
        logMessage(errors[1], 'error');
        logMessage(errors[2], 'error');
      }
    });

    await compilerPromise(serverCompiler);
  } catch (error) {
    logMessage(error, 'error');
  }

  const script = nodemon({
    script: `${paths.serverBuild}/server.js`,
    ignore: ['src', 'scripts', 'config', './*.*', 'build/client'],
  });

  script.on('restart', updatedFiles => {
    updatedFiles.forEach(updatedFile => logMessage(`Updated: ${updatedFile}`));
    logMessage('Server side app has been restarted.', 'warning');
  });

  script.on('quit', () => {
    console.log('Process ended');
    process.exit();
  });

  script.on('error', () => {
    logMessage('An error occured. Exiting', 'error');
    process.exit(1);
  });
};

start();
