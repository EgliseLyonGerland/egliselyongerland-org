// import { arrayOf } from 'normalizr';

// import { postSchema } from 'redux/schemas';

const LOAD = 'POSTS_LOAD';
const LOAD_SUCCESS = 'POSTS_LOAD_SUCCESS';
const LOAD_FAIL = 'POSTS_LOAD_FAIL';

const initialPostsState = {
  loading: false,
  loaded: false,
  total: 0,
  from: 0,
  limit: 0,
  data: [],
  aggs: {},
};

export default function posts(state = {}, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        [action.key]: {
          ...initialPostsState,
          ...state[action.key],
          loading: true,
          loaded: false,
        }
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        [action.key]: {
          ...initialPostsState,
          ...state[action.key],
          ...action.data,
          loading: false,
          loaded: true,
        }
      };
    case LOAD_FAIL:
      return {
        ...state,
        [action.key]: {
          ...initialPostsState,
          ...state[action.key],
          error: action.error,
          loading: false,
          loaded: false,
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
    from = 0,
    limit = 10,
    aggs = false,
    author = null,
    category = null,
  } = filters;

  const params = {};

  if (from) {
    params.from = from;
  }

  if (limit) {
    params.limit = limit;
  }

  if (aggs) {
    params.aggs = 1;
  }

  if (author) {
    params.author = author;
  }

  if (category) {
    params.category = category;
  }

  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: client => client.get('/posts', { params }),
    // schema: arrayOf(postSchema),
    key,
    filters,
  };
}
