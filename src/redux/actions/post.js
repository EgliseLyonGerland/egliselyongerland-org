// import { postSchema } from 'redux/schemas';

export const LOAD = "POST_LOAD";
export const LOAD_SUCCESS = "POST_LOAD_SUCCESS";
export const LOAD_FAIL = "POST_LOAD_FAIL";

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
