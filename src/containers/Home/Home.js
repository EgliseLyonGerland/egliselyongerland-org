import React, { PropTypes } from 'react';

import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { isLoaded as isPostsLoaded, load as loadPosts } from 'redux/modules/posts';

import Helmet from 'react-helmet';

import { Container, Jumbotron, PostsFeed, H1, Hr } from 'components';

const POSTS_KEY = 'home';

const asyncPromises = [{
  deferred: true,
  promise: ({ store: { dispatch, getState } }) => {
    const isLoaded = isPostsLoaded(POSTS_KEY, getState());
    const result = isLoaded ? null : dispatch(loadPosts(POSTS_KEY, { limit: 2 }));

    return __CLIENT__ ? null : result;
  }
}];

const mapStateToProps = state => {
  let posts = null;

  if (isPostsLoaded(POSTS_KEY, state)) {
    posts = state.posts[POSTS_KEY].data;
  }

  return {
    posts,
  };
};

const Home = ({ posts }) => (
  <div>
    <Helmet title="Accueil" />

    <Jumbotron
      title="Nouveau logo, nouveau site."
      baseline="L'église Lyon-Gerland s'offre un lifting numérique pour cette année 2016."
      img="http://image.toutlecine.com/photos/b/r/a/brazil-1984-01-g.jpg"
      link="#"
      linkLabel="En savoir plus"
    />

    <Container>
      <Hr xl />
      <H1>Dernières prédications</H1>
      <Hr />
      <PostsFeed posts={posts} horizontal />
    </Container>
  </div>
);

Home.propTypes = {
  posts: PropTypes.array,
};

export default connect(mapStateToProps)(
  asyncConnect(asyncPromises)(Home)
);
