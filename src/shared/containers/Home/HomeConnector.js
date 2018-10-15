import loadable from 'react-loadable';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';

import {
  isLoaded as isPostsLoaded,
  load as loadPosts,
} from 'store/actions/posts';

const LASTS_KEY = 'home-lasts';
const SERMONS_KEY = 'home-sermons';

const Home = loadable({
  loader: () => import(/* webpackChunkName: "home" */ 'containers/Home/Home'),
  loading: () => null,
});

const asyncPromises = [
  {
    promise: ({ store: { dispatch, getState } }) => {
      const promises = [];

      if (!isPostsLoaded(LASTS_KEY, getState())) {
        promises.push(dispatch(loadPosts(LASTS_KEY, { limit: 10 })));
      }

      if (!isPostsLoaded(SERMONS_KEY, getState())) {
        promises.push(
          dispatch(loadPosts(SERMONS_KEY, { limit: 2, category: 1 })),
        );
      }

      if (__CLIENT__ || !promises.length) {
        return null;
      }

      return Promise.all(promises);
    },
  },
];

const mapStateToProps = state => {
  const lasts = state.posts[LASTS_KEY].data;
  const sermons = state.posts[SERMONS_KEY].data;
  const { entities } = state;

  return {
    lasts,
    sermons,
    entities,
  };
};

export default asyncConnect(asyncPromises)(connect(mapStateToProps)(Home));
