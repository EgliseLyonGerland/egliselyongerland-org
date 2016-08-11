import { categorySchema } from 'redux/schemas';
import { arrayOf } from 'normalizr';

const LOAD = 'CATEGORIES_LOAD';
const LOAD_SUCCESS = 'CATEGORIES_LOAD_SUCCESS';
const LOAD_FAIL = 'CATEGORIES_LOAD_FAIL';

export default function (state = {}, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true,
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
  return globalState.categories
    && globalState.categories.loaded;
}

export function load(force = false) {
  return (dispatch, getState) => {
    if (force || !isLoaded(getState())) {
      return dispatch({
        types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
        promise: (client) => client.get('/taxonomies/category/terms'),
        schema: arrayOf(categorySchema),
      });
    }

    return Promise.resolve();
  };
}
