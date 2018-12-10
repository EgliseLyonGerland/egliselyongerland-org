import loadable from 'react-loadable';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';

import {
  isLoaded as isPostsLoaded,
  load as loadPosts,
} from 'store/actions/posts';

const POSTS_KEY = 'home';

const Home = loadable({
  loader: () => import(/* webpackChunkName: "home" */ 'containers/Home/Home'),
  loading: () => null,
});

const asyncPromises = [
  {
    promise: ({ store: { dispatch, getState } }) => {
      if (isPostsLoaded(POSTS_KEY, getState())) {
        return null;
      }

      const result = dispatch(loadPosts(POSTS_KEY, { limit: 3, category: 1 }));

      return __CLIENT__ ? null : result;
    },
  },
];

const mapStateToProps = state => {
  const posts = state.posts[POSTS_KEY].data;
  const { entities } = state;

  return {
    posts,
    entities,
  };
};

export default asyncConnect(asyncPromises)(connect(mapStateToProps)(Home));
