
import merge from 'lodash/merge';

// See redux/schemas.js
const initialState = {
  posts: {},
  authors: {},
};

export default function entities(state = initialState, action) {
  if (action.data && action.data.entities) {
    return merge({}, state, action.data.entities);
  }

  return state;
}
