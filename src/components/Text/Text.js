import React, {Component, PropTypes} from 'react';

export default
class Image extends Component {

  static propTypes = {
    children: PropTypes.any.isRequired,
    element: PropTypes.string.isRequired,
    fontSize: PropTypes.number,
    fontWeight: PropTypes.oneOf(['thin', 'light', 'regular', 'medium', 'bold', 'black']),
    lineHeight: PropTypes.number,
    minLines: PropTypes.number,
    maxLines: PropTypes.number,
    unit: PropTypes.string,
  }

  static defaultProps = {
    element: 'p',
    fontSize: 1.3,
    fontWeight: 'light',
    unit: 'rem',
  }

  render() {
    const styles = require('./Text.scss');

    const {
      children,
      element,
      fontSize,
      fontWeight,
      minLines,
      maxLines,
      unit,
    } = this.props;

    let { lineHeight } = this.props;

    if (!lineHeight) {
      lineHeight = Math.ceil(fontSize * 1.3 * 10) / 10;
    }

    const style = {
      fontSize: fontSize + unit,
      lineHeight: lineHeight + unit,
    };

    if (minLines) {
      style.minHeight = lineHeight * minLines + unit;
    }

    if (maxLines) {
      style.maxHeight = lineHeight * maxLines + unit;
    }

    return React.createElement(element, {
      className: styles[fontWeight],
      style,
    }, children);
  }
}
