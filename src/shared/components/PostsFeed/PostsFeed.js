import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink as Link } from 'react-router-dom';
import { get } from 'lodash';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { clearFix } from 'polished';

import Image from 'components/Image/Image';
import routes from 'utils/routes';

const styles = theme => ({
  post: {
    ...clearFix(),

    marginBottom: theme.postFeed.margin / 2,

    '&:after': {
      clear: 'both',
      content: `""`,
      width: 120,
      paddingTop: theme.postFeed.margin / 2 + 3,
      display: 'block',
      margin: [[0, 'auto']],
      backgroundImage:
        'linear-gradient(to right, #ccc 33%, rgba(255, 255, 255, 0) 0%)',
      backgroundPosition: [[-10, 'bottom']],
      backgroundSize: [[10, 3]],
      backgroundRepeat: 'repeat-x',
    },

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
    marginLeft: theme.postFeed.pictureWidth + 30,
  },

  footer: {
    background: '#f5f8f9',
    padding: 12,
  },

  picture: {
    float: 'left',
    display: 'block',
    width: theme.postFeed.pictureWidth,
  },

  title: {
    display: 'block',
    color: '#333',
    fontSize: 24,
    lineHeight: '26px',
    fontWeight: theme.typography.fontWeights.light,
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
    height: 35,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  taxonomy: {
    color: '#ccc',
    marginRight: 12,
  },

  taxonomyLabel: {
    verticalAlign: 'middle',
  },

  category: {
    fontWeight: theme.typography.fontWeights.regular,

    '&, &:hover, &:focus, &:visited': {
      color: '#999',
    },
  },

  horizontal: {
    display: 'flex',
    margin: [[0, -15]],

    '& $post': {
      flex: [[1, 1]],
      margin: [[0, 15]],
    },

    '& $title': {
      height: 52,
      overflow: 'hidden',
    },
  },
});

class PostsFeed extends Component {
  renderTaxonomies(post) {
    const { classes } = this.props;

    const category = get(post, 'categories[0]', null);
    const bibleRef = get(post, 'bibleRefs[0]', null);

    return (
      <div className={classes.taxonomies}>
        {category && (
          <Link
            className={classnames(classes.taxonomy, classes.category)}
            to={routes.blog({ category: category.id })}
          >
            <span className={classes.taxonomyLabel}>{category.name}</span>
          </Link>
        )}
        {bibleRef && (
          <Link
            className={classnames(classes.taxonomy, classes.ref)}
            to={routes.blog()}
          >
            <span className={classes.taxonomyLabel}>{bibleRef.raw}</span>
          </Link>
        )}
      </div>
    );
  }

  render() {
    const { posts, horizontal, classes } = this.props;

    return (
      <div
        className={classnames({
          [`${classes.horizontal}`]: horizontal,
        })}
      >
        {posts.map(post => {
          const imageUrl = get(post, 'picture.sizes.small.url', null);

          return (
            <div key={post.id} className={classes.post}>
              <Link className={classes.picture} to={routes.post(post.id)}>
                <Image height={130} src={imageUrl} />
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
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      categories: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
        }),
      ),
    }),
  ).isRequired,
  horizontal: PropTypes.bool,
  classes: PropTypes.shape().isRequired,
};

PostsFeed.defaultProps = {
  horizontal: false,
};

export default withStyles(styles)(PostsFeed);
