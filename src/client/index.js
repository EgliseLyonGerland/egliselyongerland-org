import React from 'react';
import createHistory from 'history/createBrowserHistory';
import { hydrate } from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import {
  ConnectedRouter as Router,
  routerMiddleware,
} from 'react-router-redux';
import { ReduxAsyncConnect } from 'redux-connect';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { ParallaxProvider } from 'react-scroll-parallax';
import ReactGA from 'react-ga';
import Loadable from 'react-loadable';

import { configureStore } from '../shared/store';
import routes from '../routes';
import ApiClient from '../shared/helpers/ApiClient';
import theme from '../shared/config/theme';

const browserHistory = window.browserHistory || createHistory();

ReactGA.initialize('UA-89204847-1');

browserHistory.listen(location => {
  if (!__DEVELOPMENT__) {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  }
});

const store =
  window.store ||
  configureStore({
    // eslint-disable-next-line no-underscore-dangle
    initialState: window.__PRELOADED_STATE__,
    middleware: [routerMiddleware(browserHistory)],
    client: new ApiClient(),
  });

Loadable.preloadReady().then(() => {
  hydrate(
    <ReduxProvider store={store}>
      <MuiThemeProvider theme={createMuiTheme(theme)}>
        <ParallaxProvider>
          <Router history={browserHistory}>
            <ReduxAsyncConnect routes={routes} />
          </Router>
        </ParallaxProvider>
      </MuiThemeProvider>
    </ReduxProvider>,
    document.getElementById('app'),
    () => {
      const ssStyles = document.getElementById('server-side-styles');

      if (ssStyles) {
        ssStyles.parentNode.removeChild(ssStyles);
      }
    },
  );
});

if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept();
  }

  if (!window.store || !window.browserHistory) {
    window.browserHistory = browserHistory;
    window.store = store;
  }
}
