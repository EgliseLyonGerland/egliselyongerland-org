// import { arrayOf } from 'normalizr';
// import { postSchema } from 'redux/schemas';

import { LOAD, LOAD_SUCCESS, LOAD_FAIL } from "redux/actions/posts";

const initialPostsState = {
  loading: false,
  loaded: false,
  total: 0,
  from: 0,
  limit: 0,
  data: [],
  aggs: {}
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
          loaded: false
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
          loaded: true
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
          loaded: false
        }
      };
    default:
      return state;
  }
}
