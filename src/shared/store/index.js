import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createResponsiveStoreEnhancer } from "redux-responsive";

import createClientMiddleware from "./middlewares/clientMiddleware";
import overlayMiddleware from "./middlewares/overlayMiddleware";
import changeRouteMiddleware from "./middlewares/changeRouteMiddleware";

import rootReducer from "./reducers";

export const configureStore = ({
  initialState,
  client,
  middleware = []
} = {}) => {
  const middlewares = [
    thunk,
    createClientMiddleware(client),
    overlayMiddleware,
    changeRouteMiddleware
  ];

  const devtools =
    typeof window !== "undefined" &&
    typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === "function" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ actionsBlacklist: [] });

  const composeEnhancers = devtools || compose;

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(...middlewares.concat(...middleware)),
      createResponsiveStoreEnhancer({ calculateInitialState: false })
    )
  );

  if (process.env.NODE_ENV !== "production") {
    if (module.hot) {
      module.hot.accept("./reducers", () =>
        store.replaceReducer(require("./reducers").default)
      );
    }
  }

  return store;
};
