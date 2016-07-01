import { postSchema } from 'redux/schemas';
import { arrayOf } from 'normalizr';

const LOAD = 'POSTS_LOAD';
const LOAD_SUCCESS = 'POSTS_LOAD_SUCCESS';
const LOAD_FAIL = 'POSTS_LOAD_FAIL';

const initialState = {
  loaded: false
};

export default function posts(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.data.result,
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.posts && globalState.posts.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/posts/load'),
    schema: arrayOf(postSchema),
  };
}
