import Express from "express";
import React from "react";
import ReactDOM from "react-dom/server";
import favicon from "serve-favicon";
import compression from "compression";
// import httpProxy from 'http-proxy';
import path from "path";
import PrettyError from "pretty-error";
import http from "http";
import "moment/locale/fr";

import { match } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import { ReduxAsyncConnect, loadOnServer } from "redux-connect";
import createHistory from "react-router/lib/createMemoryHistory";
import { Provider } from "react-redux";

// JSS
import { JssProvider, SheetsRegistry } from "react-jss";
import { create } from "jss";
import preset from "jss-preset-default";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
import createGenerateClassName from "material-ui/styles/createGenerateClassName";

import createStore from "./redux/create";
import ApiClient from "./helpers/ApiClient";
import Html from "./helpers/Html";
import config from "./config";
import getRoutes from "./routes";

const pretty = new PrettyError();
const app = new Express();
const server = new http.Server(app);

app.use(compression());
app.use(favicon(path.join(__dirname, "..", "static", "favicon.ico")));

app.use(Express.static(path.join(__dirname, "..", "static")));

app.use((req, res) => {
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
  }
  const client = new ApiClient(req);
  const memoryHistory = createHistory(req.originalUrl);
  const store = createStore(memoryHistory, client);
  const history = syncHistoryWithStore(memoryHistory, store);

  function hydrateOnClient() {
    // eslint-disable-next-line prefer-template
    res.send(
      "<!doctype html>\n" +
        ReactDOM.renderToString(
          <Html assets={webpackIsomorphicTools.assets()} store={store} />
        )
    );
  }

  if (__DISABLE_SSR__) {
    hydrateOnClient();
    return;
  }

  match(
    {
      history,
      routes: getRoutes(),
      location: req.originalUrl
    },
    (error, redirectLocation, renderProps) => {
      if (redirectLocation) {
        res.redirect(redirectLocation.pathname + redirectLocation.search);
      } else if (error) {
        console.error("ROUTER ERROR:", pretty.render(error));
        res.status(500);
        hydrateOnClient();
      } else if (renderProps) {
        loadOnServer({
          ...renderProps,
          store,
          helpers: { client }
        }).then(() => {
          const sheetsRegistry = new SheetsRegistry();
          const theme = createMuiTheme(require("./config/theme"));

          const jss = create(preset());
          jss.options.createGenerateClassName = createGenerateClassName;

          const component = (
            <Provider store={store} key="provider">
              <JssProvider registry={sheetsRegistry} jss={jss}>
                <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
                  <ReduxAsyncConnect {...renderProps} />
                </MuiThemeProvider>
              </JssProvider>
            </Provider>
          );

          const content = ReactDOM.renderToString(component);
          const css = sheetsRegistry.toString();

          res.status(200);

          global.navigator = { userAgent: req.headers["user-agent"] };

          // eslint-disable-next-line prefer-template
          res.send(
            "<!doctype html>" +
              ReactDOM.renderToString(
                <Html
                  assets={webpackIsomorphicTools.assets()}
                  content={content}
                  css={css}
                  store={store}
                />
              )
          );
        });
      } else {
        res.status(404).send("Not found");
      }
    }
  );
});

if (config.port) {
  server.listen(config.port, err => {
    if (err) {
      console.error(err);
    }
    console.info(
      "----\n==> 💻  Open http://%s:%s in a browser to view the app.",
      config.host,
      config.port
    );
  });
} else {
  console.error(
    "==>     ERROR: No PORT environment variable has been specified"
  );
}
