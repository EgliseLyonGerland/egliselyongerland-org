import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as reduxAsyncConnect } from "redux-connect";
import { createResponsiveStateReducer } from "redux-responsive";
import { canUseDOM } from "exenv";

import { app } from "../../config";

import entities from "./entities";
import overlay from "./overlay";
import searchbar from "./searchbar";
import sidebar from "./sidebar";
import posts from "./posts";
import post from "./post";

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  browser: createResponsiveStateReducer(app.breakpoints, {
    extraFields: () => ({
      width: canUseDOM ? window.innerWidth : 1024
    })
  }),
  entities,
  overlay,
  searchbar,
  sidebar,
  posts,
  post
});
