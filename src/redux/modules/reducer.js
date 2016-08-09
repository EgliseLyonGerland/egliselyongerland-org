import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-async-connect';
import { createResponsiveStateReducer } from 'redux-responsive';

import { app } from '../../config';

import entities from './entities';
import overlay from './overlay';
import searchbar from './searchbar';
import sidebar from './sidebar';
import categories from './categories';
import posts from './posts';
import books from './books';


export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  browser: createResponsiveStateReducer(app.breakpoints),
  entities,
  overlay,
  searchbar,
  sidebar,
  categories,
  posts,
  books,
});
