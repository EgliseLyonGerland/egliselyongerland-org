import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { denormalize } from 'normalizr';

import CovidBanner from 'components/CovidBanner';
import { postSchema } from 'store/schemas';
// import WhatWhenWhere from './components/WhatWhenWhere';
import Sermons from './components/Sermons';
import Intro from './components/Intro';

class Home extends Component {
  static propTypes = {
    entities: PropTypes.shape().isRequired,
    posts: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  getDenormalizedSermons() {
    const { posts, entities } = this.props;

    return denormalize(posts, [postSchema], entities);
  }

  render() {
    const posts = this.getDenormalizedSermons();

    const desc =
      "Nous sommes une église chrétienne protestante qui cherche à glorifier Dieu par la prière, par l'enseignement biblique, et par l'amour du prochain. Profondément attachés à la Bible, nous avons à cœur de diffuser son message, qui est centré sur la personne et l'oeuvre de Jésus-Christ.";

    return (
      <>
        <Helmet titleTemplate="%s">
          <title>Église Lyon Gerland • Réformée • Évangélique</title>
          <meta content={desc} name="description" />
          <meta content={desc} property="og:description" />
        </Helmet>

        <Intro />
        <CovidBanner />
        {/* <WhatWhenWhere /> */}
        <Sermons data={posts} />
      </>
    );
  }
}

export default Home;
