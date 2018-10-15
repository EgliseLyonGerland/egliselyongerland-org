import loadable from 'react-loadable';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import get from 'lodash/get';
import has from 'lodash/has';

import { load as loadPosts } from 'store/actions/posts';

const POSTS_KEY = 'blog';
const LIMIT = 10;

const Blog = loadable({
  loader: () => import(/* webpackChunkName: "blog" */ 'containers/Blog/Blog'),
  loading: () => null,
});

const asyncPromises = [
  {
    promise: ({
      match: { params },
      location: { search },
      store: { dispatch },
    }) => {
      const query = new URLSearchParams(search);

      const filters = {
        limit: LIMIT,
        aggs: 1,
      };

      if (has(params, 'category')) {
        filters.category = params.category;
      }

      if (has(params, 'author')) {
        filters.author = params.author;
      }

      if (has(params, 'book')) {
        filters.book = params.book;

        if (has(params, 'chapter')) {
          filters.chapter = params.chapter;

          if (query.has('verse')) {
            filters.verse = query.get('verse');
          }
        }
      }

      if (query.has('page')) {
        filters.from = (query.get('page') - 1) * LIMIT;
      }

      const result = dispatch(loadPosts(POSTS_KEY, filters));

      return __CLIENT__ ? null : result;
    },
  },
];

const mapStateToProps = (state, { match: { params, search } }) => {
  const query = new URLSearchParams(search);

  const { from = 0, total = 1, data = null, aggs = {}, loading = false } = get(
    state.posts,
    POSTS_KEY,
    {},
  );

  const page = Math.ceil(from / LIMIT) + 1;
  const maxPage = Math.ceil(total / LIMIT);
  const { entities } = state;

  return {
    page,
    maxPage,
    total,
    posts: data,
    aggs,
    loading,
    entities,
    params: { ...params, ...query },
  };
};

export default asyncConnect(asyncPromises)(connect(mapStateToProps)(Blog));
