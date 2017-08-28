import React from "react";
import PropTypes from "prop-types";

import classnames from "classnames";

import styles from "./Container.scss";

const Container = ({ children, className, style, ...props }) => {
  const sizes = ["xs", "sm", "md", "lg", "xl"];
  const size = sizes.reduce((prev, curr) => (props[curr] ? curr : prev), "lg");

  // Build new props
  const newProps = {
    style,
    className: classnames(className, styles.container, styles[size])
  };

  return (
    <div {...newProps}>
      {children}
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object,
  xs: PropTypes.bool,
  sm: PropTypes.bool,
  md: PropTypes.bool,
  lg: PropTypes.bool,
  xl: PropTypes.bool
};

export default Container;
