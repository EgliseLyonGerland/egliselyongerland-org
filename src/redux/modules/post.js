// import { postSchema } from 'redux/schemas';

const LOAD = "POST_LOAD";
const LOAD_SUCCESS = "POST_LOAD_SUCCESS";
const LOAD_FAIL = "POST_LOAD_FAIL";

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

export function isLoaded(globalState, id) {
  return (
    globalState.post && globalState.post[id] && globalState.post[id].loaded
  );
}

export function load(id) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: client => client.get(`/posts/${id}`),
    // schema: postSchema,
    id
  };
}
