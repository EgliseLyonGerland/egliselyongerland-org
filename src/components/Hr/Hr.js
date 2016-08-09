import React, {Component, PropTypes} from 'react';

import classnames from 'classnames';

export default
class Hr extends Component {
  static propTypes = {
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
    const styles = require('./Hr.scss');

    const {
      line,
      color,
      opacity,
      inline,
    } = this.props;

    // Check size
    const sizes = ['nm', 'xs', 'sm', 'md', 'lg', 'xl'];
    let size = 'md';

    for (const index in sizes) {
      if (this.props[sizes[index]]) {
        size = sizes[index];
      }
    }

    // Build new props
    const props = {};

    props.className = classnames(
      styles.hr,
      styles[size],
      line && styles.line,
      inline && styles.inline
    );

    if (line) {
      props.style = { borderColor: color };

      if (opacity) {
        props.opacity = opacity;
      }
    }

    return (
      <div {...props} />
    );
  }
}
