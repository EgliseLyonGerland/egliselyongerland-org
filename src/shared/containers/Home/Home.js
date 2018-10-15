import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import differenceBy from 'lodash/differenceBy';
import { denormalize } from 'normalizr';
import { withStyles } from '@material-ui/core/styles';

import { postSchema } from 'store/schemas';
import routes from 'utils/routes';

import Container from 'components/Container/Container';
import Jumbotron from 'components/Jumbotron/Jumbotron';
import PostsFeed from 'components/PostsFeed/PostsFeed';
import WhatWhenWhere from 'components/WhatWhenWhere/WhatWhenWhere';
import H2 from 'components/Text/H2';
import Hr from 'components/Hr/Hr';
import Button from 'components/Button/Button';

import worship from './worship.jpg';
import sunshineLeft from './sunshine-left.svg';
import sunshineRight from './sunshine-right.svg';

const styles = theme => ({
  welcome: {
    fontSize: '4rem',
  },
  sunshine: {
    margin: [[0, 24]],
  },
  text: {
    fontSize: '1.6rem',
  },
  [theme.breakpoints.down('xs')]: {
    welcome: {
      fontSize: '3rem',
    },
    text: {
      fontSize: '1.4rem',
    },
  },
  [theme.breakpoints.down('xxs')]: {
    welcome: {
      fontSize: '2.4rem',
      fontWeight: 500,
    },
    sunshine: {
      height: '2.4rem',
      margin: [[0, 16]],
    },
    text: {
      fontSize: '1.2rem',
      fontWeight: 500,
    },
  },
});

@withStyles(styles)
class Home extends Component {
  static propTypes = {
    classes: PropTypes.shape({}).isRequired,
    entities: PropTypes.shape().isRequired,
    lasts: PropTypes.arrayOf(PropTypes.string).isRequired,
    sermons: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

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
    const { classes } = this.props;
    const { lasts, sermons } = this.getDenormalizedPosts();

    const desc =
      "Nous sommes une église chrétienne protestante qui cherche à glorifier Dieu par la prière, par l'enseignement biblique, et par l'amour du prochain. Profondément attachés à la Bible, nous avons à cœur de diffuser son message, qui est centré sur la personne et l'oeuvre de Jésus-Christ.";

    return (
      <div>
        <Helmet titleTemplate="%s">
          <title>Église Lyon Gerland • Réformée • Évangélique</title>
          <meta content={desc} name="description" />
          <meta content={desc} property="og:description" />
        </Helmet>

        <Jumbotron background={worship}>
          <Container style={{ color: 'white', textAlign: 'center' }} sm>
            <div className={classes.welcome}>
              <img alt="" className={classes.sunshine} src={sunshineLeft} />
              Bienvenue
              <img alt="" className={classes.sunshine} src={sunshineRight} />
            </div>
            <Hr lg />
            <div className={classes.text}>
              Nous sommes une église chrétienne protestante qui cherche à
              glorifier Dieu par la prière, par l'enseignement biblique, et par
              l'amour du prochain.
            </div>
            <Hr line xl />
            <div className={classes.text}>
              Profondément attachés à la Bible, nous avons à cœur de diffuser
              son message, qui est centré sur la personne et l'oeuvre de
              Jésus-Christ.
            </div>
            <Hr xl />
            <Link to={routes.church()}>
              <Button color="white" size="lg">
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
              <Link className="pull-right" to={routes.blog()}>
                <Button size="sm">Tous les posts</Button>
              </Link>
            </div>
            <div className="col-md-5">
              <H2>Dernières prédications</H2>
              <Hr />
              <PostsFeed posts={sermons} />
              <Hr lg />
              <Link className="pull-right" to={routes.sermons()}>
                <Button size="sm">Toutes les prédications</Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

export default Home;
