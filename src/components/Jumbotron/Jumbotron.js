import React, { Component, PropTypes } from 'react';

import styles from './Jumbotron.scss';

class Jumbotron extends Component {
  static propTypes = {
    height: PropTypes.string,
    background: PropTypes.string,
    children: PropTypes.any,
  }

  render() {
    const { height, background, children } = this.props;

    const style = {};

    if (height) {
      style.height = height;
    }

    if (background) {
      style.backgroundImage = `url(${background})`;
    }

    return (
      <div className={styles.jumbotron} style={style}>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    );
  }
}

export default Jumbotron;
