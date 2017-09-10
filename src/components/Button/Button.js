import React, { Component } from "react";
import PropTypes from "prop-types";

import classes from "classnames";

import styles from "./Button.scss";

const SIZES = ["xxs", "xs", "sm", "md", "lg", "xl", "xxl"];

export default class Button extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    rounded: PropTypes.bool,
    negative: PropTypes.bool,
    onClick: PropTypes.func
  };

  static defaultProps = {
    onClick: () => {}
  };

  render() {
    const { children, rounded, negative, onClick } = this.props;

    const size = SIZES.reduce(
      (prev, curr) => (this.props[curr] ? curr : prev),
      "md"
    );

    const className = classes(styles.button, styles[size], {
      [styles.rounded]: rounded,
      [styles.negative]: negative
    });

    return (
      <button className={className} onClick={() => onClick()}>
        {children}
      </button>
    );
  }
}
