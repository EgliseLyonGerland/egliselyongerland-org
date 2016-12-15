/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
// import io from 'socket.io-client';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect } from 'redux-connect';
import withScroll from 'scroll-behavior';
import { calculateResponsiveState } from 'redux-responsive';
import { get } from 'lodash';
import 'moment/locale/fr';

import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
import getRoutes from './routes';
import DevTools from './containers/DevTools/DevTools';

const client = new ApiClient();
const _browserHistory = withScroll(browserHistory);
const store = createStore(_browserHistory, client, window.__data);
const history = syncHistoryWithStore(_browserHistory, store);

const dest = document.getElementById('content');

const component = (
  <Router
    render={(props) =>
      <ReduxAsyncConnect {...props} helpers={{ client }} />
    }
    history={history}
  >
    {getRoutes(store)}
  </Router>
);

ReactDOM.render(
  <Provider store={store} key="provider">
    {component}
  </Provider>,
  dest
);

store.dispatch(calculateResponsiveState(window));

window.addEventListener('resize', () => store.dispatch(calculateResponsiveState(window)));

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger

  if (!get(dest, 'firstChild.attributes.data-react-checksum')) {
    console.error('Server-side React render was discarded.'
      + 'Make sure that your initial render does not contain any client-side code.');
  }
}

if (__DEVTOOLS__ && !window.devToolsExtension) {
  ReactDOM.render(
    <Provider store={store} key="provider">
      <div>
        {component}
        <DevTools />
      </div>
    </Provider>,
    dest
  );
}
