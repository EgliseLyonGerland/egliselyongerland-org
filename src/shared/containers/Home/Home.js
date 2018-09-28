import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import { differenceBy } from 'lodash';
import { denormalize } from 'normalizr';

import { postSchema } from 'store/schemas';

import {
  isLoaded as isPostsLoaded,
  load as loadPosts,
} from 'store/actions/posts';
import routes from 'utils/routes';

import Container from 'components/Container/Container';
import Jumbotron from 'components/Jumbotron/Jumbotron';
import PostsFeed from 'components/PostsFeed/PostsFeed';
import WhatWhenWhere from 'components/WhatWhenWhere/WhatWhenWhere';
import Text from 'components/Text/Text';
import H2 from 'components/Text/H2';
import Hr from 'components/Hr/Hr';
import Button from 'components/Button/Button';

import worship from './worship.jpg';
import sunshineLeft from './sunshine-left.svg';
import sunshineRight from './sunshine-right.svg';

const LASTS_KEY = 'home-lasts';
const SERMONS_KEY = 'home-sermons';

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

class Home extends Component {
  getDenormalizedPosts() {
    const { lasts, sermons, entities } = this.props;

    const denormalizedLasts = denormalize(lasts, [postSchema], entities);
    const denormalizedSermons = denormalize(sermons, [postSchema], entities);

    const filteredLasts = differenceBy(
      denormalizedLasts,
      denormalizedSermons,
      'id',
    );

    return {
      lasts: filteredLasts,
      sermons: denormalizedSermons,
    };
  }

  render() {
    const { lasts, sermons } = this.getDenormalizedPosts();

    const desc =
      "Nous sommes une église chrétienne protestante qui cherche à glorifier Dieu par la prière, par l'enseignement biblique, et par l'amour du prochain. Profondément attachés à la Bible, nous avons à cœur de diffuser son message, qui est centré sur la personne et l'oeuvre de Jésus-Christ.";

    return (
      <div>
        <Helmet titleTemplate="%s">
          <title>Église Lyon Gerland • Réformée • Évangélique</title>
          <meta name="description" content={desc} />
          <meta property="og:description" content={desc} />
        </Helmet>

        <Jumbotron background={worship}>
          <Container md style={{ color: 'white', textAlign: 'center' }}>
            <Text fontSize={4} fontWeight="light" element="div">
              <img src={sunshineLeft} alt="" />
              <Hr inline />
              Bienvenue
              <Hr inline />
              <img src={sunshineRight} alt="" />
            </Text>
            <Hr lg />
            <Text fontSize={1.6}>
              Nous sommes une église chrétienne protestante qui cherche à
              glorifier Dieu par la prière, par l'enseignement biblique, et par
              l'amour du prochain.
            </Text>
            <Hr line xl />
            <Text fontSize={1.6}>
              Profondément attachés à la Bible, nous avons à cœur de diffuser
              son message, qui est centré sur la personne et l'oeuvre de
              Jésus-Christ.
            </Text>
            <Hr xl />
            <Link to={routes.church()}>
              <Button size="lg" color="white">
                En savoir plus
              </Button>
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
              <PostsFeed posts={lasts} />
              <Hr lg />
              <Link to={routes.blog()} className="pull-right">
                <Button size="sm">Tous les posts</Button>
              </Link>
            </div>
            <div className="col-md-5">
              <H2>Dernières prédications</H2>
              <Hr />
              <PostsFeed posts={sermons} />
              <Hr lg />
              <Link to={routes.sermons()} className="pull-right">
                <Button size="sm">Toutes les prédications</Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

Home.propTypes = {
  lasts: PropTypes.arrayOf(PropTypes.string).isRequired,
  sermons: PropTypes.arrayOf(PropTypes.string).isRequired,
  entities: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps)(asyncConnect(asyncPromises)(Home));
