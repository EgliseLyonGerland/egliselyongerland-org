import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { asyncConnect } from "redux-connect";
import Helmet from "react-helmet";
import moment from "moment";
import Disqus from "react-disqus-thread";
import md5 from "md5";
import { get, some } from "lodash";

import {
  Container,
  Jumbotron,
  Hr,
  H2,
  PostContent,
  AudioPlayer
} from "components";

import { load as loadPost, isLoaded as isPostLoaded } from "redux/modules/post";

import { disqus } from "../../config";

import styles from "./Post.scss";

@asyncConnect([
  {
    promise: ({ params, store: { dispatch, getState } }) => {
      const { postId } = params;

      if (isPostLoaded(getState(), postId)) {
        return null;
      }

      const result = dispatch(loadPost(postId));

      return __CLIENT__ ? null : result;
    }
  }
])
@connect((state, props) => {
  const { post } = state;
  const { params: { postId } } = props;

  return {
    post: post[postId].data
  };
})
export default class Post extends Component {
  static propTypes = {
    post: PropTypes.object
  };

  static defaultProps = {
    post: null
  };

  renderMetabar(post) {
    return (
      <Container md>
        <div className={`${styles.metabar} row`}>
          <div className="col-xs-6">
            <div className={styles.postAuthor}>{post.author.name}</div>
            <div className={styles.postDate}>{moment(post.date).fromNow()}</div>
          </div>
        </div>
        <Hr nm line color="#eee" />
      </Container>
    );
  }

  renderComments(post) {
    return (
      <Container sm>
        <div className={styles.comments}>
          <Hr xl />
          <Hr xl line color="#CCC" />
          <Hr xl />

          <Disqus
            shortname={disqus.shortname}
            identifier={md5(`post-${post.id}`)}
          />
        </div>
      </Container>
    );
  }

  renderContent(post) {
    const isPredication = some(post.categories, ["slug", "predications"]);
    const audioUrl = get(post, "extras.audioUrl", null);

    if (isPredication && audioUrl) {
      return (
        <div>
          <Container xs>
            <AudioPlayer url={audioUrl} />
          </Container>
          <Hr xl />

          {post.content && (
            <Container sm>
              <H2>Transcription</H2>
              <PostContent content={post.content} />
            </Container>
          )}
        </div>
      );
    }

    return (
      <Container sm>
        <PostContent content={post.content} />
      </Container>
    );
  }

  renderPost(post) {
    return (
      <div>
        {this.renderMetabar(post)}
        <Hr xl />
        {this.renderContent(post)}
        {this.renderComments(post)}
      </div>
    );
  }

  render() {
    const { post } = this.props;

    const title = get(post, "title", "Chargement...");
    const excerpt = get(post, "excerpt", "");
    const tags = get(post, "tags", []);
    const imageLargeUrl = get(post, "picture.sizes.large.url", null);
    const imageOriginalUrl = get(post, "picture.url", null);

    return (
      <div>
        <Helmet
          title={title}
          meta={[
            { name: "description", content: "" },
            { property: "keywords", content: tags.join(",") },

            { property: "og:type", content: "article" },
            { property: "og:title", content: title },
            { property: "og:description", content: excerpt },
            { property: "og:image", content: imageOriginalUrl },

            { property: "twitter:title", content: title },
            { property: "twitter:description", content: excerpt },
            { property: "twitter:image", content: imageOriginalUrl }
          ]}
        />

        <Jumbotron
          height="500px"
          background={imageLargeUrl}
          title={title}
          overlay={0.3}
          fontSize={2.6}
        />
        {post && this.renderPost(post)}
      </div>
    );
  }
}
