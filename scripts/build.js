const webpack = require('webpack');
const rimraf = require('rimraf');
const webpackConfig = require('../webpack')(
  process.env.NODE_ENV || 'production',
);
const paths = require('../webpack/paths');
const { logMessage, compilerPromise } = require('./utils');

const [clientConfig, serverConfig] = webpackConfig;

const build = async () => {
  rimraf.sync(paths.clientBuild);
  rimraf.sync(paths.serverBuild);

  try {
    // Client
    const clientCompiler = webpack(clientConfig);

    clientCompiler.watch({}, (error, stats) => {
      if (!error && !stats.hasErrors()) {
        console.log(stats.toString(clientConfig.stats));
      }
    });

    await compilerPromise(clientCompiler);

    // Server
    const serverCompiler = webpack(serverConfig);

    serverCompiler.watch({}, (error, stats) => {
      if (!error && !stats.hasErrors()) {
        console.log(stats.toString(serverConfig.stats));
      }
    });

    await compilerPromise(serverCompiler);

    logMessage('Done!', 'info');
  } catch (error) {
    logMessage(error, 'error');
  }

  process.exit();
};

build();
