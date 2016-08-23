import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import Helmet from 'react-helmet';
import { Parallax } from 'react-parallax';
import Gravatar from 'react-gravatar';
import moment from 'moment';
import Disqus from 'react-disqus-thread';
import md5 from 'md5';

import { Container, Spinner, Hr, Text } from 'components';

import { load as loadPost, isLoaded as isPostLoaded } from 'redux/modules/post';

import styles from './Post.scss';

@asyncConnect([{
  promise: ({ params, store: { dispatch, getState } }) => {
    const { postId } = params;

    const result = isPostLoaded(getState()) ? null : dispatch(loadPost(postId));

    return __CLIENT__ ? null : result;
  }
}])
@connect(
  (state, props) => {
    const { entities } = state;
    const { params: { postId } } = props;
    const post = entities.posts[postId];
    const author = post ? entities.authors[post.author] : null;

    return {
      post,
      author,
    };
  }
)
export default
class Post extends Component {

  static propTypes = {
    post: PropTypes.object,
    author: PropTypes.object,
  };

  static defaultProps = {
    post: null,
  };

  render() {
    const { post, author } = this.props;

    if (!post) {
      return (<Spinner />);
    }

    const gravatarId = author.avatar ? author.avatar.match(/[a-f0-9]{32}/i)[0] : null;

    return (
      <div>
        <Helmet title={post.title} />

        <Parallax bgImage={post.featured_image.attachment_meta.sizes.large.url} strength={400}>
          <div className={styles.image} />
        </Parallax>

        <Container md>
          <div className={styles.content}>
            <Text element="h1" fontWeight="light" fontSize={2.6}>{post.title}</Text>
            <Hr lg />
            <Text element="div" fontSize={1} color="#555">
              <span>
                {gravatarId && <Gravatar md5={gravatarId} size={40} />}
                <Hr inline md />
                <b>{author.name}</b>
              </span>
              <Hr inline>—</Hr>
              <span title={moment(post.date).format()}>
                <Text fontSize={1.2} lineHeight={1.5} className="fa fa-clock-o" />
                <Hr inline sm />
                <span>{moment(post.date).fromNow()}</span>
              </span>
            </Text>
            <Hr lg />
            <Text element="div">
              <div className={styles.text} dangerouslySetInnerHTML={{ __html: post.content }} />
            </Text>
            <Hr xl />
            <div className={styles.comments}>
              <Text fontSize={1.6} fontWeight="regular">Discussion</Text>
              <Hr lg />
              <Disqus
                shortname="egliselyongerland-dev"
                identifier={md5(`post-${post.id}`)}
              />
            </div>
          </div>
        </Container>
      </div>
    );
  }
}
