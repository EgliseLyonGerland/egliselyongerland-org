import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "react-router-redux";
import { createResponsiveStoreEnhancer } from "redux-responsive";
import thunk from "redux-thunk";

import reducers from "./reducers";

import createClientMiddleware from "./middleware/clientMiddleware";
import overlayMiddleware from "./middleware/overlayMiddleware";
import changeRouteMiddleware from "./middleware/changeRouteMiddleware";

export default (history, client, data) => {
  // Sync dispatched route actions to the history
  const reduxRouterMiddleware = routerMiddleware(history);

  const middleware = [
    thunk,
    createClientMiddleware(client),
    overlayMiddleware,
    changeRouteMiddleware,
    reduxRouterMiddleware
  ];

  let finalCreateStore = compose(
    applyMiddleware(...middleware),
    createResponsiveStoreEnhancer({ calculateInitialState: false })
  )(createStore);

  if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
    // eslint-disable-next-line global-require
    const { persistState } = require("redux-devtools");
    // eslint-disable-next-line global-require
    const DevTools = require("../containers/DevTools/DevTools");

    finalCreateStore = compose(
      applyMiddleware(...middleware),
      window.devToolsExtension
        ? window.devToolsExtension()
        : DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(createStore);
  }

  const store = finalCreateStore(reducers, data);

  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept("./reducers", () => {
      // eslint-disable-next-line global-require
      store.replaceReducer(require("./reducers"));
    });
  }

  return store;
};
