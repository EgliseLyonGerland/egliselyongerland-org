import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createResponsiveStoreEnhancer } from 'redux-responsive';
import thunk from 'redux-thunk';

import createClientMiddleware from './middleware/clientMiddleware';
import overlayMiddleware from './middleware/overlayMiddleware';

import reducer from './modules/reducer';

export default function createStore(history, client, data) {
  // Sync dispatched route actions to the history
  const reduxRouterMiddleware = routerMiddleware(history);

  const middleware = [
    thunk,
    createClientMiddleware(client),
    overlayMiddleware,
    reduxRouterMiddleware
  ];

  let finalCreateStore;
  if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
    // eslint-disable-next-line global-require
    const { persistState } = require('redux-devtools');
    // eslint-disable-next-line global-require
    const DevTools = require('../containers/DevTools/DevTools');

    finalCreateStore = compose(
      createResponsiveStoreEnhancer({ calculateStateInitially: false }),
      applyMiddleware(...middleware),
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(_createStore);
  } else {
    finalCreateStore = applyMiddleware(...middleware)(_createStore);
  }

  const store = finalCreateStore(reducer, data);

  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('./modules/reducer', () => {
      // eslint-disable-next-line global-require
      store.replaceReducer(require('./modules/reducer'));
    });
  }

  return store;
}
