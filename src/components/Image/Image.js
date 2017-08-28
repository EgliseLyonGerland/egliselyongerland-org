import React, { Component } from "react";
import PropTypes from "prop-types";

import styles from "./Image.scss";

class Image extends Component {
  static propTypes = {
    src: PropTypes.string,
    title: PropTypes.string,
    ratio: PropTypes.number,
    height: PropTypes.number,
    seoFriendly: PropTypes.bool
  };

  static defaultProps = {
    seoFriendly: true,
    ratio: 9 / 16
  };

  render() {
    const {
      // src,
      title = "",
      ratio,
      height,
      seoFriendly
    } = this.props;

    const src = this.props.src || "/images/placeholder.jpg";
    const style = { backgroundImage: `url(${src})` };

    if (height) {
      style.height = `${height}px`;
    } else {
      style.paddingBottom = `${100 * ratio}%`;
    }

    return (
      <div className={styles.image} style={style}>
        {seoFriendly && <img className={styles.img} src={src} alt={title} />}
      </div>
    );
  }
}

export default Image;
