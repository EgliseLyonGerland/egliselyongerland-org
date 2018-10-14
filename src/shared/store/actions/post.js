import get from 'lodash/get';
import { postSchema } from '../schemas';

export const LOAD = 'POST_LOAD';
export const LOAD_SUCCESS = 'POST_LOAD_SUCCESS';
export const LOAD_FAIL = 'POST_LOAD_FAIL';

export function isLoaded(globalState, id) {
  const post = get(globalState, ['entities', 'posts', id]);

  return post && !post.partial;
}

export function load(id) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: client => client.get(`/posts/${id}`),
    schema: postSchema,
    id,
  };
}
