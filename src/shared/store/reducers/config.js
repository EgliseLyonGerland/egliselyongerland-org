import { LOAD, LOAD_SUCCESS, LOAD_FAIL } from '../actions/config';

export default function config(state = {}, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true,
        loaded: false,
        data: {},
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.data,
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
        data: {},
      };
    default:
      return state;
  }
}
