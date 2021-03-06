import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import get from 'lodash/get';
import { denormalize } from 'normalizr';
import format from 'date-fns/format';
import locale from 'date-fns/locale/fr';

import { postSchema } from 'store/schemas';
import NotFound from 'containers/NotFound/NotFound';

import { getAbsoluteUrl } from 'utils/routes';
import logoPicutre from 'images/logo.jpg';
import Header from './components/Header';
import Shares from './components/Shares';
import PostContent from './components/PostContent';

const getMetaDescription = post => {
  let excerpt = get(post, 'excerpt', '');

  const sermonDate = get(post, ['extras', 'sermonDate']);

  if (post.predication && sermonDate) {
    excerpt = `Prédication du ${format(
      post.extras.sermonDate,
      'dddd D MMMM YYYY',
      { locale },
    )}. ${excerpt}`;
  }

  return excerpt;
};

const renderContent = post => {
  if (post.partial) {
    return null;
  }

  return <PostContent post={post} />;
};

class Post extends Component {
  getDenormalizedPost() {
    const { post, entities } = this.props;

    return denormalize(post, postSchema, entities);
  }

  render() {
    const { notFound, location } = this.props;

    if (notFound) {
      return <NotFound />;
    }

    const post = this.getDenormalizedPost();

    const title = get(post, 'title', 'Chargement...');
    const description = getMetaDescription(post);
    const tags = get(post, 'tags', []);
    const imageOriginalUrl = get(
      post,
      'picture.url',
      '/images/placeholder.jpg',
    );

    const shareUrl = getAbsoluteUrl(location.pathname);
    const logoUrl = getAbsoluteUrl(logoPicutre);

    const structuredData = {
      '@context': 'http://schema.org',
      '@type': 'BlogPosting',
      headline: title,
      description,
      datePublished: post.date,
      dateModified: post.date,
      image: imageOriginalUrl,
      author: {
        '@type': 'Person',
        name: post.author.name,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Église Lyon Gerland',
        logo: {
          '@type': 'ImageObject',
          url: logoUrl,
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': shareUrl,
      },
    };

    return (
      <div>
        <Helmet
          meta={[
            { name: 'description', content: description },
            { property: 'keywords', content: tags.join(',') },

            { property: 'og:type', content: 'article' },
            { property: 'og:title', content: title },
            { property: 'og:description', content: description },
            { property: 'og:image', content: imageOriginalUrl },

            { property: 'twitter:title', content: title },
            { property: 'twitter:description', content: description },
            { property: 'twitter:image', content: imageOriginalUrl },
          ]}
          title={title}
        >
          <script type="application/ld+json">
            {JSON.stringify(structuredData)}
          </script>
        </Helmet>

        <Header post={post} url={shareUrl} />

        {renderContent(post)}

        <Shares title={post.title} url={shareUrl} />
      </div>
    );
  }
}

Post.propTypes = {
  entities: PropTypes.shape(),
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  notFound: PropTypes.bool,
  post: PropTypes.shape(),
};

Post.defaultProps = {
  post: null,
  entities: null,
  notFound: false,
};

export default Post;
