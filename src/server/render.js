import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect';
import { parse as parseUrl } from 'url';
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
} from '@material-ui/core/styles';

// JSS
import { SheetsRegistry } from 'react-jss/lib/jss';
import JssProvider from 'react-jss/lib/JssProvider';

import Html from './components/HTML';
import routes from '../routes';
import theme from '../shared/config/theme';

const serverRenderer = () => async (req, res) => {
  const { store } = req;
  const location = parseUrl(req.url);

  await loadOnServer({ store, location, routes });

  const registry = new SheetsRegistry();
  const muiTheme = createMuiTheme(theme);
  const generateClassName = createGenerateClassName();

  const staticContext = {};

  const content = renderToString(
    <ReduxProvider store={req.store}>
      <JssProvider {...{ registry, generateClassName }}>
        <MuiThemeProvider sheetsManager={new Map()} theme={muiTheme}>
          <Router context={staticContext} location={req.url}>
            <ReduxAsyncConnect routes={routes} />
          </Router>
        </MuiThemeProvider>
      </JssProvider>
    </ReduxProvider>,
  );

  const css = registry.toString();
  const state = JSON.stringify(store.getState());

  return res.status(staticContext.status || 200).send(
    `<!doctype html>${renderToString(
      <Html
        css={css}
        scripts={[
          res.locals.assetPath('bundle.js'),
          res.locals.assetPath('vendor.js'),
        ]}
        state={state}
        styles={[
          res.locals.assetPath('bundle.css'),
          res.locals.assetPath('vendor.css'),
        ]}
      >
        {content}
      </Html>,
    )}`,
  );
};

export default serverRenderer;
