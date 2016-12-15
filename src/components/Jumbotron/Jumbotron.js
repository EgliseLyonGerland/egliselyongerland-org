import React, { Component, PropTypes } from 'react';

import { Text, Hr } from 'components';

import styles from './Jumbotron.scss';

class Jumbotron extends Component {
  static propTypes = {
    height: PropTypes.string,
    background: PropTypes.string,
    title: PropTypes.string,
    children: PropTypes.any,
  }

  static defaultProps = {
    background: '/images/jumbotrons/default.jpg',
  }

  render() {
    const { title, height, background, children } = this.props;

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
          {title &&
            <div>
              <Text fontSize="4" color="white" fontWeight="bold">{title}</Text>
              <Hr line />
            </div>
          }

          {children}
        </div>
      </div>
    );
  }
}

export default Jumbotron;
