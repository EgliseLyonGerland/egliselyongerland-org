import React, { Component } from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { Router, applyRouterMiddleware } from "react-router";
import { ReduxAsyncConnect } from "redux-connect";
import useScroll from "react-router-scroll/lib/useScroll";
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
import ReactGA from "react-ga";

const theme = createMuiTheme(require("../config/theme"));

ReactGA.initialize("UA-89204847-1", { debug: __DEVELOPMENT__ });

function logPageView() {
  ReactGA.set({ page: window.location.pathname + window.location.search });
  ReactGA.pageview(window.location.pathname + window.location.search);
}

export default class Root extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    routes: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired
  };

  render() {
    const { store } = this.props;

    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <Router
            key={module.hot && new Date()}
            onUpdate={logPageView}
            render={props => (
              <ReduxAsyncConnect
                {...props}
                render={applyRouterMiddleware(useScroll())}
              />
            )}
            {...this.props}
          />
        </MuiThemeProvider>
      </Provider>
    );
  }
}
