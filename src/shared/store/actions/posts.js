import { get } from 'lodash';

import { postSchema } from '../schemas';

export const LOAD = 'POSTS_LOAD';
export const LOAD_SUCCESS = 'POSTS_LOAD_SUCCESS';
export const LOAD_FAIL = 'POSTS_LOAD_FAIL';

export function isLoaded(key, globalState) {
  return get(globalState, `posts.${key}.loaded`, false);
}

export function load(key, params = {}) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: client => client.get('/posts', { params }),
    schema: { data: [postSchema] },
    key,
  };
}
