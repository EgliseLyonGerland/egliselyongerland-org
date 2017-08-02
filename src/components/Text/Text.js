import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import styles from './Text.scss';

export default
class Text extends Component {

  static propTypes = {
    children: PropTypes.any,
    element: PropTypes.string.isRequired,
    className: PropTypes.string,
    fontSize: PropTypes.number,
    fontWeight: PropTypes.oneOf(['thin', 'light', 'regular', 'medium', 'bold', 'black']),
    lineHeight: PropTypes.number,
    italic: PropTypes.bool,
    color: PropTypes.string,
    minLines: PropTypes.number,
    maxLines: PropTypes.number,
    align: PropTypes.oneOf(['left', 'center', 'right', 'justify']),
    ellipsis: PropTypes.bool,
    fadeLastLine: PropTypes.bool,
    unit: PropTypes.string,
  }

  static defaultProps = {
    element: 'p',
    fontSize: 1.3,
    fontWeight: 'light',
    align: 'left',
    ellipsis: false,
    fadeLastLine: false,
    unit: 'rem',
  }

  render() {
    const {
      children,
      element,
      fontSize,
      fontWeight,
      italic,
      color,
      minLines,
      maxLines,
      align,
      ellipsis,
      fadeLastLine,
      unit,
      className,
    } = this.props;

    let { lineHeight } = this.props;

    if (!lineHeight) {
      lineHeight = Math.ceil(fontSize * 1.5 * 10) / 10;
    }

    const style = {
      fontSize: fontSize + unit,
      lineHeight: lineHeight + unit,
    };

    if (minLines) {
      style.minHeight = (lineHeight * minLines) + unit;
      style.overflow = 'hidden';
    }

    if (maxLines) {
      style.maxHeight = (lineHeight * maxLines) + unit;
      style.overflow = 'hidden';
    }

    if (italic) {
      style.fontStyle = 'italic';
    }

    if (color) {
      style.color = color;
    }

    const classes = [className, styles.text];

    if (fontWeight !== 'light') {
      classes.push(styles[fontWeight]);
    }

    if (align !== 'left') {
      classes.push(styles[align]);
    }

    if (fadeLastLine) {
      classes.push(styles.fade);
    }

    if (ellipsis && maxLines === 1) {
      classes.push(styles.ellipsis);
    }

    return React.createElement(element, {
      className: classnames(classes),
      style,
    }, children);
  }
}
