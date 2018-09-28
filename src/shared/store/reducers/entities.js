import merge from 'lodash/merge';

// See store/schemas.js
const initialState = {
  posts: {},
  authors: {},
  categories: {},
};

export default function entities(state = initialState, action) {
  if (action.data && action.data.entities) {
    return merge({}, state, action.data.entities);
  }

  return state;
}
