import loadable from 'react-loadable';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import get from 'lodash/get';

import { load as loadPost, isLoaded as isPostLoaded } from 'store/actions/post';

const Post = loadable({
  loader: () => import(/* webpackChunkName: "post" */ 'containers/Post/Post'),
  loading: () => null,
});

const asyncPromises = [
  {
    promise: ({ match: { params }, store: { dispatch, getState } }) => {
      const { postId } = params;

      if (isPostLoaded(getState(), postId)) {
        return null;
      }

      const result = dispatch(loadPost(postId));

      return __CLIENT__ ? null : result;
    },
  },
];

const mapStateToProps = (state, props) => {
  const { post, entities } = state;
  const {
    match: {
      params: { postId },
    },
  } = props;

  const data = entities.posts[postId];
  const notFound = !!get(post, [postId, 'error']);

  return {
    post: data,
    entities,
    notFound,
  };
};

export default asyncConnect(asyncPromises)(connect(mapStateToProps)(Post));
