import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import isArray from 'lodash/isArray';

import classnames from 'classnames';

const styles = {
  burger: {
    border: 0,
    padding: 0,
    background: 'none',
    display: 'block',
    outline: 0,
  },
  line: {
    display: 'block',
    transitionTimingFunction: 'cubic-bezier(0.535, 0.010, 0.265, 1.550)',
    transitionDuration: '0.5s',
  },
  last: {
    marginBottom: 0,
  },
  out: {
    transitionProperty: 'background, transform',
  },
  in: {
    transitionProperty: 'background, opacity',
  },
  rounded: {
    borderRadius: 5,
  },
};

class Burger extends Component {
  handleClick() {
    const { onClick } = this.props;

    onClick();
  }

  renderLines() {
    const lines = [];
    const {
      size,
      height,
      weight,
      color,
      mutedColor,
      rounded,
      muted,
      classes,
      delay,
    } = this.props;
    const gutter = (height - weight * size) / (size - 1);

    for (let index = 1; index <= size; index += 1) {
      const isOut = index === 1 || index === size;
      const isIn = index > 1 && index < size;
      const isFirst = index === 1;
      const isLast = index === size;

      const props = {
        className: classnames(
          classes.line,
          rounded && classes.rounded,
          isOut && classes.out,
          isIn && classes.in,
          isFirst && classes.first,
          isLast && classes.last,
        ),
        style: {
          height: `${weight}px`,
          backgroundColor: muted && mutedColor ? mutedColor : color,
        },
      };

      if (delay) {
        if (isArray) {
          props.style.transitionDelay = `${muted ? delay[0] : delay[1]}s`;
        } else {
          props.style.transitionDelay = `${delay}s`;
        }
      }

      if (!isLast) {
        props.style.marginBottom = `${gutter}px`;
      }

      if (muted) {
        if (isIn) {
          props.style.opacity = '0';
        }

        if (isFirst) {
          props.style.transform = `translateY(${height / 2 -
            weight / 2}px) rotate(45deg)`;
        }

        if (isLast) {
          props.style.transform = `translateY(-${height / 2 -
            weight / 2}px) rotate(-45deg)`;
        }
      }

      lines.push(<span key={index} {...props} />);
    }

    return lines;
  }

  render() {
    const { width, height, classes } = this.props;

    return (
      <span
        className={classes.burger}
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

Burger.propTypes = {
  color: PropTypes.string,
  delay: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number),
  ]),
  height: PropTypes.number,
  muted: PropTypes.bool,
  mutedColor: PropTypes.string,
  onClick: PropTypes.func,
  rounded: PropTypes.bool,
  size: PropTypes.number,
  weight: PropTypes.number,
  width: PropTypes.number,
};

Burger.defaultProps = {
  size: 3,
  weight: 2,
  width: 30,
  height: 18,
  color: '#222',
  delay: null,
  mutedColor: null,
  rounded: false,
  muted: false,
  onClick: () => {},
};

export default withStyles(styles)(Burger);
