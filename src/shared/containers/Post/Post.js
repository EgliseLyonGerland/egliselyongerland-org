import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { asyncConnect } from "redux-connect";
import Helmet from "react-helmet";
import { get } from "lodash";
import { denormalize } from "normalizr";
import moment from "moment";

import { postSchema } from "store/schemas";
import { load as loadPost, isLoaded as isPostLoaded } from "store/actions/post";

import Header from "./components/Header";
import Shares from "./components/Shares";
import PostContent from "./components/PostContent";
import NoTranscription from "./components/NoTranscription";

import { getAbsoluteUrl } from "utils/routes";

const getMetaDescription = post => {
  let excerpt = get(post, "excerpt", "");

  const sermonDate = get(post, ["extras", "sermonDate"]);

  if (post.predication && sermonDate) {
    excerpt = `Prédication du ${moment(post.extras.sermonDate).format(
      "dddd D MMMM YYYY"
    )}. ${excerpt}`;
  }

  return excerpt;
};

const asyncPromises = [
  {
    promise: ({ match: { params }, store: { dispatch, getState } }) => {
      const { postId } = params;

      if (isPostLoaded(getState(), postId)) {
        return null;
      }

      const result = dispatch(loadPost(postId));

      return __CLIENT__ ? null : result;
    }
  }
];

const mapStateToProps = (state, props) => {
  const { entities } = state;
  const {
    match: {
      params: { postId }
    }
  } = props;

  const post = entities.posts[postId];

  return {
    post,
    entities
  };
};

class Post extends Component {
  static propTypes = {
    post: PropTypes.object,
    entities: PropTypes.object
  };

  static defaultProps = {
    post: null,
    entities: null
  };

  getDenormalizedPost() {
    const { post, entities } = this.props;

    return denormalize(post, postSchema, entities);
  }

  renderContent(post) {
    if (post.partial) {
      return null;
    }

    if (post.content === "" && get(post, "extras.audioUrl", null)) {
      return <NoTranscription />;
    }

    return <PostContent content={post.content} />;
  }

  render() {
    const post = this.getDenormalizedPost();

    const title = get(post, "title", "Chargement...");
    const description = getMetaDescription(post);
    const tags = get(post, "tags", []);
    const imageOriginalUrl = get(
      post,
      "picture.url",
      "/images/placeholder.jpg"
    );

    const shareUrl = getAbsoluteUrl(this.props.location.pathname);
    const logoUrl = getAbsoluteUrl("/images/logo.jpg");

    const structuredData = {
      "@context": "http://schema.org",
      "@type": "BlogPosting",
      headline: title,
      description,
      datePublished: post.date,
      dateModified: post.date,
      image: imageOriginalUrl,
      author: {
        "@type": "Person",
        name: post.author.name
      },
      publisher: {
        "@type": "Organization",
        name: "Église Lyon Gerland",
        logo: {
          "@type": "ImageObject",
          url: logoUrl
        }
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": shareUrl
      }
    };

    return (
      <div>
        <Helmet
          title={title}
          meta={[
            { name: "description", content: description },
            { property: "keywords", content: tags.join(",") },

            { property: "og:type", content: "article" },
            { property: "og:title", content: title },
            { property: "og:description", content: description },
            { property: "og:image", content: imageOriginalUrl },

            { property: "twitter:title", content: title },
            { property: "twitter:description", content: description },
            { property: "twitter:image", content: imageOriginalUrl }
          ]}
        >
          <script type="application/ld+json">
            {JSON.stringify(structuredData)}
          </script>
        </Helmet>

        <Header post={post} url={shareUrl} />

        {this.renderContent(post)}

        <Shares title={post.title} url={shareUrl} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(asyncConnect(asyncPromises)(Post));
