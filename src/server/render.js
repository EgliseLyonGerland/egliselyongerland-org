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
import { ParallaxProvider } from 'react-scroll-parallax';

// react-loadable
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';

// JSS
import { SheetsRegistry } from 'react-jss/lib/jss';
import JssProvider from 'react-jss/lib/JssProvider';

import Html from './components/HTML';
import routes from '../shared/config/routes';
import theme from '../shared/config/theme';
import stats from '../../build/client/react-loadable.json';

const serverRenderer = () => async (req, res) => {
  const { store } = req;
  const location = parseUrl(req.url);

  await loadOnServer({ store, location, routes });

  const registry = new SheetsRegistry();
  const muiTheme = createMuiTheme(theme);
  const generateClassName = createGenerateClassName();

  const modules = [];
  const staticContext = {};

  const content = renderToString(
    <Loadable.Capture report={moduleName => modules.push(moduleName)}>
      <ReduxProvider store={req.store}>
        <JssProvider generateClassName={generateClassName} registry={registry}>
          <MuiThemeProvider sheetsManager={new Map()} theme={muiTheme}>
            <ParallaxProvider>
              <Router context={staticContext} location={req.url}>
                <ReduxAsyncConnect routes={routes} />
              </Router>
            </ParallaxProvider>
          </MuiThemeProvider>
        </JssProvider>
      </ReduxProvider>
    </Loadable.Capture>,
  );

  const css = registry.toString();
  const state = JSON.stringify(store.getState());
  const bundles = getBundles(stats, modules);
  const styles = bundles.filter(bundle => bundle.file.endsWith('.css'));
  const scripts = bundles.filter(bundle => bundle.file.endsWith('.js'));

  return res.status(staticContext.status || 200).send(
    `<!doctype html>${renderToString(
      <Html
        css={css}
        scripts={[
          ...scripts.map(({ publicPath }) => publicPath),
          res.locals.assetPath('bundle.js'),
          res.locals.assetPath('vendor.js'),
        ]}
        state={state}
        styles={[
          ...styles.map(({ publicPath }) => publicPath),
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
