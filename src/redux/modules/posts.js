import { postSchema } from 'redux/schemas';
import { arrayOf } from 'normalizr';

const LOAD = 'POSTS_LOAD';
const LOAD_SUCCESS = 'POSTS_LOAD_SUCCESS';
const LOAD_FAIL = 'POSTS_LOAD_FAIL';

export default function posts(state = {}, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        [action.key]: {
          loading: true,
        }
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        [action.key]: {
          loading: false,
          loaded: true,
          data: action.data.result,
        }
      };
    case LOAD_FAIL:
      return {
        ...state,
        [action.key]: {
          loading: false,
          loaded: false,
          error: action.error
        }
      };
    default:
      return state;
  }
}

export function isLoaded(key, globalState) {
  return globalState.posts
    && globalState.posts[key]
    && globalState.posts[key].loaded;
}

export function load(key, filters = {}) {
  const {
    page = 1,
    limit = 10,
    categories,
  } = filters;

  const params = { page };

  if (limit) {
    params['filter[posts_per_page]'] = limit;
  }

  if (categories) {
    params['filter[category__and][]'] = categories;
  }

  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/posts', { params }),
    schema: arrayOf(postSchema),
    key,
    filters,
  };
}
