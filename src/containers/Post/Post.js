import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { asyncConnect } from "redux-connect";
import Helmet from "react-helmet";
import moment from "moment";
import Disqus from "react-disqus-thread";
import md5 from "md5";
import { get } from "lodash";

import { Container, Jumbotron, Image, Hr, Text } from "components";

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

  renderComments(post) {
    return (
      <div className={styles.comments}>
        <Hr xl />
        <Hr xl line color="#CCC" />
        <Hr xl />

        <Disqus
          shortname={disqus.shortname}
          identifier={md5(`post-${post.id}`)}
        />
      </div>
    );
  }

  renderPost(post) {
    return (
      <Container lg>
        <div className="row">
          <div className="col-md-4">
            <Text element="div" fontSize={1} color="#555">
              <span>
                <span className={styles.avatar}>
                  <Image src={post.author.picture} ratio={1} />
                </span>
                <Hr inline md />
                <b>
                  {post.author.name}
                </b>
              </span>
              <Hr inline>—</Hr>
              <span title={moment(post.date).format()}>
                <Text
                  fontSize={1.2}
                  lineHeight={1.5}
                  className="fa fa-clock-o"
                />
                <Hr inline sm />
                <span>
                  {moment(post.date).fromNow()}
                </span>
              </span>
            </Text>
          </div>
          <div className="col-md-8">
            <Text element="div">
              <div
                className={styles.text}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </Text>

            {this.renderComments(post)}
          </div>
        </div>
      </Container>
    );
  }

  render() {
    const { post } = this.props;

    const title = get(post, "title", "Chargement...");
    const tags = get(post, "tags", []);
    const imageLargeUrl = get(post, "pictures.large", null);
    const imageOriginalUrl = get(post, "pictures.original", null);

    return (
      <div>
        <Helmet
          title={title}
          meta={[
            { name: "description", content: "" },
            { property: "keywords", content: tags.join(",") },

            { property: "og:type", content: "article" },
            { property: "og:title", content: title },
            { property: "og:description", content: title },
            { property: "og:image", content: imageOriginalUrl },

            { property: "twitter:title", content: title },
            { property: "twitter:title", content: title },
            { property: "twitter:description", content: title },
            { property: "twitter:image", content: imageOriginalUrl }
          ]}
        />

        <Jumbotron
          background={imageLargeUrl}
          title={title}
          overlay={0.3}
          fontSize={2.6}
        />
        <Hr xl />
        {post && this.renderPost(post)}
      </div>
    );
  }
}
