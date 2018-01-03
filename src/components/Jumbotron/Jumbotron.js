import React, { Component } from "react";
import PropTypes from "prop-types";

import styles from "./Jumbotron.scss";
import picture from "./default.jpg";

const getBonus = str => {
  return 1 + 1 / str.length;
};

class Jumbotron extends Component {
  static propTypes = {
    background: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.any
  };

  static defaultProps = {
    background: null,
    title: null,
    children: null
  };

  render() {
    const { title, background, children } = this.props;

    return (
      <div
        className={styles.jumbotron}
        style={{ backgroundImage: `url(${background || picture})` }}
      >
        <div className={styles.inner}>
          <div className={styles.emptyRow1} />
          <div className={styles.emptyRow2} />

          {title && (
            <div className={styles.title}>
              <h1 style={{ fontSize: `${getBonus(title)}em` }}>{title}</h1>
            </div>
          )}

          {children}

          <div className={styles.emptyRow3} />
        </div>
      </div>
    );
  }
}

export default Jumbotron;
