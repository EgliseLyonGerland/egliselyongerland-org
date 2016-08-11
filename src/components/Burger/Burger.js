import React, { Component, PropTypes } from 'react';

import classes from 'classnames';

import styles from './Burger.scss';

export default
class Burger extends Component {

  static propTypes = {
    size: PropTypes.number,
    weight: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    color: PropTypes.string,
    rounded: PropTypes.bool,
    muted: PropTypes.bool,
    onClick: PropTypes.func,
  }

  static defaultProps = {
    size: 3,
    weight: 2,
    width: 30,
    height: 18,
    color: '#222',
    rounded: false,
    muted: false,
    onClick: () => {},
  }

  handleClick() {
    this.props.onClick();
  }

  renderLines() {
    const lines = [];
    const { size, height, weight, color, rounded } = this.props;
    const gutter = (height - (weight * size)) / (size - 1);

    for (let index = 1; index <= size; index++) {
      const isOut = (index === 1 || index === size);
      const isIn = (index > 1 && index < size);
      const isFirst = (index === 1);
      const isLast = (index === size);

      const props = {
        className: classes(
          styles.line,
          rounded && styles.rounded,
          isOut && styles.out,
          isIn && styles.in,
          isFirst && styles.first,
          isLast && styles.last,
        ),
        style: {
          height: `${weight}px`,
          backgroundColor: color,
        },
      };

      if (!isLast) {
        props.style.marginBottom = `${gutter}px`;
      }

      if (this.props.muted) {
        if (isIn) {
          props.style.opacity = '0';
        }

        if (isFirst) {
          props.style.transform = `translateY(${(height / 2) - (weight / 2)}px) rotate(45deg)`;
        }

        if (isLast) {
          props.style.transform = `translateY(-${(height / 2) - (weight / 2)}px) rotate(-45deg)`;
        }
      }

      lines.push(<div key={index} {...props} />);
    }

    return lines;
  }

  render() {
    const { width, height } = this.props;

    return (
      <span
        className={styles.burger}
        style={{
          width: `${width}px`,
          height: `${height}px`,
        }}
        onClick={() => this.handleClick()}
      >
        {this.renderLines()}
      </span>
    );
  }
}
