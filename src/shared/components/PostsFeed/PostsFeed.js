import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink as Link } from 'react-router-dom';
import get from 'lodash/get';
import classnames from 'classnames';
import format from 'date-fns/format';
import locale from 'date-fns/locale/fr';
import { withStyles } from '@material-ui/core/styles';
import clearFix from 'polished/lib/mixins/clearFix';
import LazyLoad from 'react-lazyload';

import BackgroundImage from 'components/Image/BackgroundImage';
import routes from 'utils/routes';

const styles = theme => ({
  post: {
    ...clearFix(),

    display: 'flex',
    marginBottom: theme.postFeed.margin / 2,

    '&:last-child': {
      marginBottom: 0,

      '&:after': {
        visibility: 'hidden',
        height: 0,
        margin: 0,
        padding: 0,
      },
    },
  },
  content: {
    marginLeft: 24,
  },
  footer: {
    background: '#f5f8f9',
    padding: 12,
  },
  picture: {
    minWidth: theme.postFeed.pictureWidth,
  },
  title: {
    display: 'block',
    color: '#777',
    fontSize: 18,
    lineHeight: '26px',
    fontWeight: theme.typography.fontWeights.medium,
  },
  avatar: {
    float: 'left',
    verticalAlign: 'middle',
    width: 36,
    marginRight: 12,
    border: 'solid 1px #eee',
  },
  taxonomies: {
    fontSize: 14,
    fontWeight: theme.typography.fontWeights.regular,
    marginBottom: 12,
  },
  taxonomy: {
    display: 'inline-block',
    marginRight: 8,
    color: '#aaa',

    '&:after': {
      content: '"•"',
      marginLeft: 8,
      display: 'inline-block',
    },
    '&:last-child:after': {
      content: '""',
      marginLeft: 0,
    },
  },
  taxonomyLink: {
    color: '#aaa',
  },
  taxonomyLabel: {
    verticalAlign: 'middle',
  },
  category: {
    fontWeight: theme.typography.fontWeights.medium,
  },

  [theme.breakpoints.down('xs')]: {
    content: {
      marginLeft: 16,
    },
  },
});

class PostsFeed extends Component {
  renderTaxonomies(post) {
    const { classes } = this.props;

    const category = get(post, 'categories[0]', null);
    const bibleRef = get(post, 'bibleRefs[0]', null);
    const date = get(post, ['extras', 'sermonDate'], post.date);

    return (
      <div className={classes.taxonomies}>
        {category && (
          <span className={classnames(classes.taxonomy, classes.category)}>
            <Link
              to={routes.blog({ category: category.id })}
              className={classes.taxonomyLink}
            >
              <span className={classes.taxonomyLabel}>{category.name}</span>
            </Link>
          </span>
        )}
        {bibleRef && (
          <span className={classes.taxonomy}>
            <Link
              to={routes.blog({
                book: bibleRef.bookId,
                chapter: bibleRef.chapterStart,
              })}
              className={classes.taxonomyLink}
            >
              <span className={classes.taxonomyLabel}>{bibleRef.raw}</span>
            </Link>
          </span>
        )}
        <span className={classes.taxonomy}>
          {format(date, 'D/MM/YY', { locale })}
        </span>
      </div>
    );
  }

  render() {
    const { posts, classes } = this.props;

    return (
      <div>
        {posts.map(post => {
          const imageUrl = get(post, 'picture.sizes.small.url', null);

          return (
            <div key={post.id} className={classes.post}>
              <Link className={classes.picture} to={routes.post(post.id)}>
                <LazyLoad height={130}>
                  <BackgroundImage height={130} src={imageUrl} />
                </LazyLoad>
              </Link>

              <div className={classes.content}>
                {this.renderTaxonomies(post)}
                <Link className={classes.title} to={routes.post(post.id)}>
                  {post.title}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

PostsFeed.propTypes = {
  classes: PropTypes.shape().isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      categories: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
        }),
      ),
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

PostsFeed.defaultProps = {};

export default withStyles(styles)(PostsFeed);
