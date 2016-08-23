import { postSchema } from 'redux/schemas';

const LOAD = 'POST_LOAD';
const LOAD_SUCCESS = 'POST_LOAD_SUCCESS';
const LOAD_FAIL = 'POST_LOAD_FAIL';

export default function () {}

export function isLoaded(globalState, id) {
  return globalState.posts && globalState.posts[id];
}

export function load(id) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`/posts/${id}`),
    schema: postSchema,
  };
}
