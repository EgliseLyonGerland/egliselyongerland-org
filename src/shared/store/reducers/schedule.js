import { LOAD, LOAD_SUCCESS, LOAD_FAIL } from '../actions/schedule';

export default function schedule(state = {}, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true,
        loaded: false,
        data: null,
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
        data: null,
      };
    default:
      return state;
  }
}
