import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import { differenceBy } from 'lodash';

import { isLoaded as isPostsLoaded, load as loadPosts } from 'redux/modules/posts';
import routes from 'utils/routes';

import {
  Container,
  Jumbotron,
  PostsFeed,
  WhatWhenWhere,
  Button,
  Text,
  H2,
  Hr
} from 'components';

import worship from './worship.jpg';
import sunshineLeft from './sunshine-left.svg';
import sunshineRight from './sunshine-right.svg';

const POSTS_KEY = 'home-posts';
const SERMONS_KEY = 'home-sermons';

const asyncPromises = [{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];

    if (!isPostsLoaded(POSTS_KEY, getState())) {
      promises.push(dispatch(loadPosts(POSTS_KEY, { limit: 10 })));
    }

    if (!isPostsLoaded(SERMONS_KEY, getState())) {
      promises.push(dispatch(loadPosts(SERMONS_KEY, { limit: 2 })));
    }

    if (__CLIENT__ || !promises.length) {
      return null;
    }

    return Promise.all(promises);
  }
}];

const mapStateToProps = state => {
  let posts = [];
  let sermons = [];

  if (isPostsLoaded(SERMONS_KEY, state)) {
    sermons = state.posts[SERMONS_KEY].data;
  }

  if (isPostsLoaded(POSTS_KEY, state)) {
    posts = differenceBy(state.posts[POSTS_KEY].data, sermons, 'id');
  }

  return {
    posts,
    sermons,
  };
};

class Home extends Component {
  static propTypes = {
    posts: PropTypes.array,
    sermons: PropTypes.array,
  }

  render() {
    const { posts, sermons } = this.props;

    return (
      <div>
        <Helmet title="Accueil" />

        <Jumbotron height="100vh" background={worship}>
          <Container md style={{ color: 'white', textAlign: 'center' }}>
            <Text fontSize={4} fontWeight="thin" element="div">
              <img src={sunshineLeft} role="presentation" />
              <Hr inline />
              Bienvenue
              <Hr inline />
              <img src={sunshineRight} role="presentation" />
            </Text>
            <Hr lg />
            <Text fontSize={1.6}>
              Nous sommes une église chrétienne protestante qui cherche
              à glorifier Dieu par la prière, par l'enseignement biblique,
              et par l'amour du prochain.
            </Text>
            <Hr line xl />
            <Text fontSize={1.6}>
              Profondément attachés à la Bible, nous avons à cœur de diffuser
              son message, qui est centré sur la personne et l'oeuvre de Jésus-Christ.
            </Text>
            <Hr xl />
            <Link to={routes.church()}>
              <Button lg negative>En savoir plus</Button>
            </Link>
          </Container>
        </Jumbotron>
        <Container xl>
          <WhatWhenWhere />
        </Container>
        <Hr lg />
        <Container>
          <div className="row">
            <div className="col-md-7">
              <H2>Derniers posts</H2>
              <Hr />
              <PostsFeed posts={posts} />
              <Hr lg />
              <Link to={routes.blog()} className="pull-right">
                <Button sm>Tous les posts</Button>
              </Link>
            </div>
            <div className="col-md-5">
              <H2>Dernières prédications</H2>
              <Hr />
              <PostsFeed posts={sermons} />
              <Hr lg />
              <Link to={routes.sermons()} className="pull-right">
                <Button sm>Toutes les prédications</Button>
              </Link>
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
