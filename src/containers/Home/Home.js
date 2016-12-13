import React, { PropTypes, Component } from 'react';

import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { isLoaded as isPostsLoaded, load as loadPosts } from 'redux/modules/posts';

import Helmet from 'react-helmet';

import { Container, Jumbotron, PostsFeed, H2, Hr } from 'components';

import styles from './Home.scss';

const POSTS_KEY = 'home';

const asyncPromises = [{
  promise: ({ store: { dispatch, getState } }) => {
    const isLoaded = isPostsLoaded(POSTS_KEY, getState());
    const result = isLoaded ? null : dispatch(loadPosts(POSTS_KEY, { limit: 10 }));

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

        <Jumbotron background="/worship.jpg">
          <Container sm>
            <div className={styles.welcome}>
              <div className={styles.welcomeHeadline}>
                Bienvenue.
              </div>
              <div className={styles.welcomeContentline}>
                On vous donne rendez-vous le dimanche à 17h pour célébrer le Seigneur Jésus Christ
              </div>
            </div>
          </Container>
        </Jumbotron>
        <Hr lg />
        <Container>
          <div className="row">
            <div className="col-md-7">
              <H2>Derniers posts</H2>
              <Hr />
              <PostsFeed posts={posts} />
            </div>
            <div className="col-md-5">
              <H2>Dernières prédications</H2>
              <Hr />
              <PostsFeed posts={posts.slice(0, 2)} />
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

export default connect(mapStateToProps)(
  asyncConnect(asyncPromises)(Home)
);
