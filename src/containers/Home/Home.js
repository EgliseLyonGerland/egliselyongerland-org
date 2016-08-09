import React, { Component, PropTypes } from 'react';
// import { Link } from 'react-router';
// import config from '../../config';

import { connect } from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import { isLoaded as isPostsLoaded, load as loadPosts } from 'redux/modules/posts';

import Helmet from 'react-helmet';

import { Jumbotron, Image, Text, Hr } from 'components';

const POSTS_KEY = 'home';

@asyncConnect([{
  deferred: true,
  promise: ({ store: { dispatch, getState }}) => {
    if (!isPostsLoaded(POSTS_KEY, getState())) {
      return dispatch(loadPosts(POSTS_KEY, { limit: 2 }));
    }
  }
}])
@connect(
  state => {
    const { entities } = state;

    let posts = null;

    if (isPostsLoaded(POSTS_KEY, state)) {
      posts = state.posts.home.data.map(id => entities.posts[id]);
    }

    return {
      posts,
    };
  }
)
export default
class Home extends Component {

  static propTypes = {
    posts: PropTypes.array,
  };

  render() {
    // const styles = require('./Home.scss');
    const { posts } = this.props;

    return (
      <div>
        <Helmet title="Accueil"/>

        <Jumbotron
          title="Nouveau logo, nouveau site."
          baseline="L'église Lyon-Gerland s'offre un lifting numérique pour cette année 2016."
          img="http://image.toutlecine.com/photos/b/r/a/brazil-1984-01-g.jpg"
          link="#"
          linkLabel="En savoir plus"
        />

        {posts && (
          <div className="container">
            <Hr xl />

            <div className="row">
              {posts.slice(0, 2).map((post, index) => {
                return (
                  <div className="col-xs-6" key={index}>
                    <Image src={`http://lorempixel.com/400/200/people/${index}`} />
                    <Hr sm />
                    <Text fontSize={1.5} minLines={3} maxLines={3}>{post.title}</Text>
                    <Hr />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
}
