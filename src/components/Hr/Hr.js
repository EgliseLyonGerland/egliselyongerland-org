import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import styles from './Hr.scss';

const SIZES = ['nm', 'xs', 'sm', 'md', 'lg', 'xl'];

class Hr extends Component {
  static propTypes = {
    children: PropTypes.any,
    line: PropTypes.bool,
    color: PropTypes.string,
    opacity: PropTypes.number,
    inline: PropTypes.bool,
    width: PropTypes.string,
  }

  static defaultProps = {
    line: false,
    color: 'white',
    opacity: 1,
    inline: false,
  }

  render() {
    const { children, line, color, opacity, inline, width } = this.props;

    // Check size
    const size = SIZES.reduce((prev, curr) => (this.props[curr] ? curr : prev), 'md');

    // Build new props
    const newProps = {};

    newProps.className = classnames(
      styles.hr,
      styles[size],
      line && styles.line,
      inline && styles.inline
    );

    if (line) {
      newProps.style = {
        backgroundImage: `linear-gradient(to right, ${color} 33%, transparent 0%)`,
      };

      if (opacity) {
        newProps.opacity = opacity;
      }

      if (width) {
        newProps.style.width = width;
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
