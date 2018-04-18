import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import { clearfix } from "utils/styles";

const styles = theme => ({
  container: {
    ...clearfix(),
    marginRight: "auto",
    marginLeft: "auto",
    paddingLeft: 35,
    paddingRight: 35,
    maxWidth: 1200
  },
  xs: {
    maxWidth: 500
  },
  sm: {
    maxWidth: 700
  },
  md: {
    maxWidth: 900
  },
  lg: {
    maxWidth: 1100
  },
  xl: {
    maxWidth: 1300
  },
  "@media screen and (max-width: 480px)": {
    container: {
      paddingLeft: 25,
      paddingRight: 25
    }
  },
  "@media screen and (max-width: 640px)": {
    container: {
      paddingLeft: 15,
      paddingRight: 15
    }
  }
});

const Container = ({ children, className, style, classes, ...props }) => {
  const sizes = ["xs", "sm", "md", "lg", "xl"];
  const size = sizes.reduce((prev, curr) => (props[curr] ? curr : prev), "lg");

  // Build new props
  const newProps = {
    style,
    className: classnames(className, classes.container, classes[size])
  };

  return <div {...newProps}>{children}</div>;
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

export default withStyles(styles)(Container);
