import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';

import entities from './entities';
import overlay from './overlay';
import searchbar from './searchbar';
import sidebar from './sidebar';
import posts from './posts';
import post from './post';
import audio from './audio';
import announcement from './announcement';
import schedule from './schedule';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  entities,
  overlay,
  searchbar,
  sidebar,
  posts,
  post,
  audio,
  announcement,
  schedule,
});
