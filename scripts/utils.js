const chalk = require('chalk');

const logMessage = (message, level = 'info') => {
  let color = 'white';

  if (level === 'error') color = 'red';
  else if (level === 'warning') color = 'yellow';

  console.log(`[${new Date().toISOString()}]`, chalk[color](message));
};

const compilerPromise = compiler =>
  new Promise((resolve, reject) => {
    compiler.plugin('done', stats => {
      if (!stats.hasErrors()) {
        return resolve();
      }
      return reject(new Error('Compilation failed'));
    });
  });

module.exports = {
  logMessage,
  compilerPromise,
};
