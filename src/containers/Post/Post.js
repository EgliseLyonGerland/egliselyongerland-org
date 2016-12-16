import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import Helmet from 'react-helmet';
import moment from 'moment';
import Disqus from 'react-disqus-thread';
import md5 from 'md5';
import { get } from 'lodash';

import { Container, Jumbotron, Spinner, Hr, Text } from 'components';

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

    if (!post) {
      return (<Spinner />);
    }

    const imageUrl = get(post, 'pictures.large', null);

    return (
      <div>
        <Helmet title={post.title} />

        <Jumbotron background={imageUrl} title={post.title} height="600px" />

        <Container md>
          <div className={styles.content}>
            <Text element="div" fontSize={1} color="#555">
              <span>
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
