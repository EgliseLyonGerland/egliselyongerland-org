import express from 'express';
import cors from 'cors';
import path from 'path';
import chalk from 'chalk';
import manifestHelpers from 'express-manifest-helpers';
import bodyParser from 'body-parser';
import Loadable from 'react-loadable';

import serverRender from './render';
import paths from '../../webpack/paths';
import { configureStore } from '../shared/store';
import ApiClient from '../shared/helpers/ApiClient';

require('dotenv').config();

const app = express();

// if (process.env.NODE_ENV === "development") {
app.use(express.static('static'));
app.use('/static', express.static('static'));
// }

app.use(cors());

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.store = configureStore({
    client: new ApiClient(req),
  });
  return next();
});

app.use(
  manifestHelpers({ manifestPath: `${paths.clientBuild}/manifest.json` }),
);

app.use(serverRender());

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) =>
  res.status(404).json({
    status: 'error',
    message: err.message,
    stack:
      // print a nicer stack trace by splitting line breaks and making them array items
      process.env.NODE_ENV === 'development' &&
      (err.stack || '')
        .split('\n')
        .map(line => line.trim())
        .map(line => line.split(path.sep).join('/'))
        .map(line =>
          line.replace(
            process
              .cwd()
              .split(path.sep)
              .join('/'),
            '.',
          ),
        ),
  }),
);

Loadable.preloadAll().then(() => {
  app.listen(process.env.PORT || 8500, () => {
    console.log(
      `[${new Date().toISOString()}]`,
      chalk.blue(
        `App is running: http://localhost:${process.env.PORT || 8500}`,
      ),
    );
  });
});

export default app;
