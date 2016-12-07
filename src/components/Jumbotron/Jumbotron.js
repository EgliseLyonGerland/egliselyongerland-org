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

    const style = {
      height: height || '70px',
    };

    if (background) {
      style.backgroundImage = `url(${background})`;
    }

    return (
      <div className={styles.jumbotron} style={style}>
        {children}
      </div>
    );
  }
}

export default Jumbotron;
