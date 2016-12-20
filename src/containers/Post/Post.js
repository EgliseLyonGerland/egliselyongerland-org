import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import Helmet from 'react-helmet';
import moment from 'moment';
import Disqus from 'react-disqus-thread';
import md5 from 'md5';
import { get } from 'lodash';

import { Container, Jumbotron, Image, Hr, Text } from 'components';

import { load as loadPost, isLoaded as isPostLoaded } from 'redux/modules/post';

import { disqus } from '../../config';

import styles from './Post.scss';

@asyncConnect([{
  promise: ({ params, store: { dispatch, getState } }) => {
    const { postId } = params;

    if (isPostLoaded(getState(), postId)) {
      return null;
    }

    const result = dispatch(loadPost(postId));

    return __CLIENT__ ? null : result;
  }
}])
@connect(
  (state, props) => {
    const { post } = state;
    const { params: { postId } } = props;

    return {
      post: post[postId].data,
    };
  }
)
export default
class Post extends Component {

  static propTypes = {
    post: PropTypes.object,
  };

  static defaultProps = {
    post: null,
  };

  render() {
    const { post } = this.props;

    const title = get(post, 'title', 'Chargement...');
    const imageUrl = get(post, 'pictures.large', null);

    return (
      <div>
        <Helmet title={title} />

        <Jumbotron background={imageUrl} title={title} overlay={0.3} fontSize={2.6} />
        <Hr />
        <Container md>
          {post &&
            <div className={styles.content}>
              <Text element="div" fontSize={1} color="#555">
                <span>
                  <span className={styles.avatar}>
                    <Image src={post.author.picture} ratio={1} />
                  </span>
                  <Hr inline md />
                  <b>{post.author.name}</b>
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
              <Hr xl line color="#CCC" />
              <Hr xl />
              <div className={styles.comments}>
                <Disqus
                  shortname={disqus.shortname}
                  identifier={md5(`post-${post.id}`)}
                />
              </div>
            </div>
          }
        </Container>
      </div>
    );
  }
}
