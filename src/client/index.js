import React from "react";
import createHistory from "history/createBrowserHistory";
import { hydrate } from "react-dom";
import { Provider as ReduxProvider } from "react-redux";
import {
  ConnectedRouter as Router,
  routerMiddleware
} from "react-router-redux";
import { ReduxAsyncConnect } from "redux-connect";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { calculateResponsiveState } from "redux-responsive";
import ReactGA from "react-ga";
import "moment/locale/fr";

import { configureStore } from "../shared/store";
import routes from "../routes";
import ApiClient from "../shared/helpers/ApiClient";
import theme from "../shared/config/theme";

const browserHistory = window.browserHistory || createHistory();

ReactGA.initialize("UA-89204847-1");

browserHistory.listen((location, action) => {
  if (!__DEVELOPMENT__) {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  }
});

const store =
  window.store ||
  configureStore({
    initialState: window.__PRELOADED_STATE__,
    middleware: [routerMiddleware(browserHistory)],
    client: new ApiClient()
  });

hydrate(
  <ReduxProvider store={store}>
    <MuiThemeProvider theme={createMuiTheme(theme)}>
      <Router history={browserHistory}>
        <ReduxAsyncConnect routes={routes} />
      </Router>
    </MuiThemeProvider>
  </ReduxProvider>,
  document.getElementById("app"),
  () => {
    store.dispatch(calculateResponsiveState(window));

    const ssStyles = document.getElementById("server-side-styles");
    ssStyles && ssStyles.parentNode.removeChild(ssStyles);
  }
);

window.addEventListener("resize", () =>
  store.dispatch(calculateResponsiveState(window))
);

if (process.env.NODE_ENV === "development") {
  if (module.hot) {
    module.hot.accept();
  }

  if (!window.store || !window.browserHistory) {
    window.browserHistory = browserHistory;
    window.store = store;
  }
}
