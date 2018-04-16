/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import "babel-polyfill";
import React from "react";
import { hydrate } from "react-dom";
import { AppContainer } from "react-hot-loader";
import { match, browserHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import { calculateResponsiveState } from "redux-responsive";
import { get } from "lodash";
import "moment/locale/fr";

import createStore from "./redux/create";
import ApiClient from "./helpers/ApiClient";
import getRoutes from "./routes";
import Root from "./containers/Root";

import "./theme/bootstrap.scss";
import "./theme/base.scss";

const client = new ApiClient();
const store = createStore(browserHistory, client, window.__data);
const history = syncHistoryWithStore(browserHistory, store);

const dest = document.getElementById("content");

const renderApp = renderProps =>
  hydrate(
    <AppContainer>
      <Root {...{ store, history, ...renderProps }} />
    </AppContainer>,
    document.getElementById("content"),
    () => {
      const ssStyles = document.getElementById("server-side-styles");
      ssStyles && ssStyles.parentNode.removeChild(ssStyles);

      store.dispatch(calculateResponsiveState(window));
    }
  );

window.addEventListener("resize", () =>
  store.dispatch(calculateResponsiveState(window))
);

match(
  { history, routes: getRoutes() },
  (error, redirectLocation, renderProps) => renderApp(renderProps)
);

if (module.hot) {
  module.hot.accept("./routes", () => {
    const nextRoutes = require("./routes");
    renderApp({ routes: nextRoutes() });
  });
}
