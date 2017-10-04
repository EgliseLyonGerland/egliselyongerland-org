// import { postSchema } from 'redux/schemas';

import { LOAD, LOAD_SUCCESS, LOAD_FAIL } from "redux/actions/post";

export default function posts(state = {}, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        [action.id]: {
          loading: true,
          loaded: false,
          data: null
        }
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        [action.id]: {
          loading: false,
          loaded: true,
          data: action.data
        }
      };
    case LOAD_FAIL:
      return {
        ...state,
        [action.id]: {
          loading: false,
          loaded: false,
          error: action.error,
          data: null
        }
      };
    default:
      return state;
  }
}
