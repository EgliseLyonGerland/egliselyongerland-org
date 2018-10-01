import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

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
    transitionTimingFunction: 'ease-out',
    transitionDuration: '0.2s',
  },
  last: {
    marginBottom: 0,
  },
  out: {
    transitionProperty: 'transform',
  },
  in: {
    transitionProperty: 'opacity',
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
    const { size, height, weight, color, rounded, muted, classes } = this.props;
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
          backgroundColor: color,
        },
      };

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

      lines.push(<div key={index} {...props} />);
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
  height: PropTypes.number,
  muted: PropTypes.bool,
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
  rounded: false,
  muted: false,
  onClick: () => {},
};

export default withStyles(styles)(Burger);
