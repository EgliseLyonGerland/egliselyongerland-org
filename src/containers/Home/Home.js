import React, { PropTypes, Component } from 'react';

import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { isLoaded as isPostsLoaded, load as loadPosts } from 'redux/modules/posts';

import Helmet from 'react-helmet';

import { Container, Jumbotron, PostsFeed, H1, Hr } from 'components';

const POSTS_KEY = 'home';

const asyncPromises = [{
  promise: ({ store: { dispatch, getState } }) => {
    const isLoaded = isPostsLoaded(POSTS_KEY, getState());
    const result = isLoaded ? null : dispatch(loadPosts(POSTS_KEY, { limit: 2 }));

    return __CLIENT__ ? null : result;
  }
}];

const mapStateToProps = state => {
  let posts = [];

  if (isPostsLoaded(POSTS_KEY, state)) {
    posts = state.posts[POSTS_KEY].data;
  }

  return {
    posts,
  };
};

class Home extends Component {
  static propTypes = {
    posts: PropTypes.array,
  }

  render() {
    const { posts } = this.props;

    return (
      <div>
        <Helmet title="Accueil" />

        <Jumbotron background="/worship.jpg" height="80vh" />

        <Container>
          <Hr xl />
          <H1>Dernières prédications</H1>
          <Hr />
          <PostsFeed posts={posts} horizontal />
        </Container>
      </div>
    );
  }
}

export default connect(mapStateToProps)(
  asyncConnect(asyncPromises)(Home)
);
