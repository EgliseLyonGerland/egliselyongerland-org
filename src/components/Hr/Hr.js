import React, { Component, PropTypes } from 'react';

import classnames from 'classnames';

import styles from './Hr.scss';

class Hr extends Component {
  static propTypes = {
    children: PropTypes.any,
    line: PropTypes.bool,
    color: PropTypes.string,
    opacity: PropTypes.number,
    inline: PropTypes.bool,
    nm: PropTypes.bool,
    xs: PropTypes.bool,
    sm: PropTypes.bool,
    md: PropTypes.bool,
    lg: PropTypes.bool,
    xl: PropTypes.bool,
  }

  static defaultProps = {
    line: false,
    color: '#DDD',
    opacity: 1,
    inline: false,
  }

  render() {
    const { children, line, color, opacity, inline } = this.props;

    // Check size
    const sizes = ['nm', 'xs', 'sm', 'md', 'lg', 'xl'];
    const size = sizes.reduce((prev, curr) => (this.props[curr] ? curr : prev), 'md');

    // Build new props
    const newProps = {};

    newProps.className = classnames(
      styles.hr,
      styles[size],
      line && styles.line,
      inline && styles.inline
    );

    if (line) {
      newProps.style = { borderColor: color };

      if (opacity) {
        newProps.opacity = opacity;
      }
    }

    return (
      <div {...newProps}>
        {children}
      </div>
    );
  }
}

export default Hr;
