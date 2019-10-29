const webpack = require('webpack');
const rimraf = require('rimraf');
const webpackConfigs = require('../webpack')(
  process.env.NODE_ENV || 'production',
);
const paths = require('../webpack/paths');

const { log } = console;

const [clientConfig, serverConfig] = webpackConfigs;

const compile = config =>
  new Promise((resolve, reject) => {
    webpack(config, (err, stats) => {
      if (err) {
        reject(new Error(err));
        return;
      }

      log(stats.toString(config.stats));
      resolve();
    });
  });

const build = async () => {
  rimraf.sync(paths.clientBuild);
  rimraf.sync(paths.serverBuild);

  await compile(clientConfig);
  await compile(serverConfig);
};

build();
