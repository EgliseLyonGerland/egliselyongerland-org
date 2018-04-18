import React, { Component } from "react";
import PropTypes from "prop-types";

// import { Link } from 'react-router';
import { fill } from "lodash";
// import moment from 'moment';
// import randomcolor from 'randomcolor';
import classes from "classnames";
//
// import { Image, Text } from 'components';

import styles from "./BlankItemsFeed.scss";

export default class BlankItemsFeed extends Component {
  static propTypes = {
    items: PropTypes.number,
    color: PropTypes.string,
    horizontal: PropTypes.bool
  };

  static defaultProps = {
    color: "#e5eef1",
    horizontal: false
  };

  render() {
    const { items, color, horizontal } = this.props;

    return (
      <div
        className={classes(styles.items, {
          [`${styles.horizontal}`]: horizontal
        })}
      >
        {fill(new Array(items), 0).map((value, index) => (
          <div className={styles.item} key={index}>
            <div
              className={styles.picture}
              style={{ backgroundColor: color }}
            />
            <div className={styles.content}>
              <div
                className={styles.line1}
                style={{ backgroundColor: color }}
              />
              <div
                className={styles.line2}
                style={{ backgroundColor: color }}
              />
              <div
                className={styles.line3}
                style={{ backgroundColor: color }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }
}
