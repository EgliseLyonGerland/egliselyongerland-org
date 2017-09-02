import React, { Component } from "react";
import PropTypes from "prop-types";

import { Link } from "react-router";
import { get } from "lodash";
// import moment from 'moment';
import randomcolor from "randomcolor";
import classes from "classnames";

import { Image } from "components";
import routes from "utils/routes";

import styles from "./PostsFeed.scss";

export default class PostsFeed extends Component {
  static propTypes = {
    posts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        categories: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string.isRequired
          })
        )
      })
    ).isRequired,
    horizontal: PropTypes.bool
  };

  static defaultProps = {
    horizontal: false
  };

  renderBullet(color) {
    const props = {
      className: styles.bullet
    };

    if (color) {
      props.style = { color };
    }

    return <span {...props}>•</span>;
  }

  renderTaxonomies(post) {
    const category = get(post, "categories[0]", null);
    const bibleRef = get(post, "bibleRefs[0]", null);

    return (
      <div className={styles.taxonomies}>
        {category &&
          <Link
            to={routes.blog({ category: category.id })}
            className={classes(styles.taxonomy, styles.category)}
          >
            {this.renderBullet(randomcolor({ seed: category.name }))}
            <span className={styles.taxonomyLabel}>
              {category.name}
            </span>
          </Link>}
        {bibleRef &&
          <Link
            to={routes.blog()}
            className={classes(styles.taxonomy, styles.ref)}
          >
            {this.renderBullet()}
            <span className={styles.taxonomyLabel}>
              {bibleRef.raw}
            </span>
          </Link>}
      </div>
    );
  }

  render() {
    const { posts, horizontal } = this.props;

    return (
      <div
        className={classes(styles.posts, {
          [`${styles.horizontal}`]: horizontal
        })}
      >
        {posts.map(post => {
          const imageUrl = get(post, "picture.sizes.small.url", null);

          return (
            <div className={styles.post} key={post.id}>
              <Link className={styles.picture} to={routes.post(post.id)}>
                <Image src={imageUrl} height={130} />
              </Link>

              <div className={styles.content}>
                {this.renderTaxonomies(post)}
                <Link className={styles.title} to={routes.post(post.id)}>
                  {post.title}
                </Link>
              </div>

              {/* <div className={styles.footer}>
                <span className={styles.avatar}>
                  <Image src={post.author.picture} ratio={1} />
                </span>
                <Text fontSize={14} lineHeight={20} unit="px" fontWeight="regular">
                  <Link to={routes.blog({ author: post.author.id })}>
                    {post.author.name}
                  </Link>
                </Text>
                <Text fontSize={12} lineHeight={16} unit="px">
                  {moment(post.date).fromNow()}
                </Text>
              </div> */}
            </div>
          );
        })}
      </div>
    );
  }
}
