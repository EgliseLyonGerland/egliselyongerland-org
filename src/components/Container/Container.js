import React, {Component, PropTypes} from 'react';

import classnames from 'classnames';

export default
class Container extends Component {
  static propTypes = {
    children: PropTypes.object,
    className: PropTypes.string,
    style: PropTypes.object,
    xs: PropTypes.bool,
    sm: PropTypes.bool,
    md: PropTypes.bool,
    lg: PropTypes.bool,
    xl: PropTypes.bool,
  }

  render() {
    const styles = require('./Container.scss');

    const { children, className, style } = this.props;

    // Check size
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];
    let size = 'lg';

    for (const index in sizes) {
      if (this.props[sizes[index]]) {
        size = sizes[index];
      }
    }

    // Build new props
    const props = {
      style,
    };

    props.className = classnames(
      className,
      styles.container,
      styles[size],
    );

    return (
      <div {...props}>
        {children}
      </div>
    );
  }
}
