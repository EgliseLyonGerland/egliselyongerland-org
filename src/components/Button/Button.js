import React, { Component, PropTypes } from 'react';

import styles from './Button.scss';

export default
class Button extends Component {

  static propTypes = {
    children: PropTypes.any.isRequired,
    size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  }

  static defaultProps = {
    size: 'md',
  }

  render() {
    const { children, size } = this.props;

    return (
      <button className={`${styles.button} ${styles[size]}`}>
        {children}
      </button>
    );
  }
}
