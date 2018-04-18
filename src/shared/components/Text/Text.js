import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import classnames from "classnames";

const styles = theme => ({
  text: {
    fontWeight: theme.typography.fontWeights.light
  },
  thin: {
    fontWeight: theme.typography.fontWeights.thin
  },
  light: {
    fontWeight: theme.typography.fontWeights.light
  },
  regular: {
    fontWeight: theme.typography.fontWeights.regular
  },
  medium: {
    fontWeight: theme.typography.fontWeights.medium
  },
  bold: {
    fontWeight: theme.typography.fontWeights.bold
  },
  black: {
    fontWeight: theme.typography.fontWeights.black
  },
  left: {
    textAlign: "left"
  },
  right: {
    textAlign: "right"
  },
  center: {
    textAlign: "center"
  },
  justify: {
    textAlign: "justify"
  },
  ellipsis: {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  fade: {
    position: "relative",

    "&:after": {
      content: `""`,
      position: `absolute`,
      bottom: 0,
      left: 0,
      right: 0,
      height: 40,
      backgroundImage: "linear-gradient(to bottom, transparent 0%, white 100%)",
      backgroundRepeat: "repeat-x"
    }
  }
});

const Text = ({
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
  classes,
  ...props
}) => {
  let { lineHeight } = props;

  if (!lineHeight) {
    lineHeight = Math.ceil(fontSize * 1.5 * 10) / 10;
  }

  const style = {
    fontSize: fontSize + unit,
    lineHeight: lineHeight + unit
  };

  if (minLines) {
    style.minHeight = lineHeight * minLines + unit;
    style.overflow = "hidden";
  }

  if (maxLines) {
    style.maxHeight = lineHeight * maxLines + unit;
    style.overflow = "hidden";
  }

  if (italic) {
    style.fontStyle = "italic";
  }

  if (color) {
    style.color = color;
  }

  const classNames = [className, classes.text];

  if (fontWeight !== "light") {
    classNames.push(classes[fontWeight]);
  }

  if (align !== "left") {
    classNames.push(classes[align]);
  }

  if (fadeLastLine) {
    classNames.push(classes.fade);
  }

  if (ellipsis && maxLines === 1) {
    classNames.push(classes.ellipsis);
  }

  return React.createElement(
    element,
    {
      className: classnames(classNames),
      style
    },
    children
  );
};

Text.propTypes = {
  children: PropTypes.any,
  element: PropTypes.string.isRequired,
  className: PropTypes.string,
  fontSize: PropTypes.number,
  fontWeight: PropTypes.oneOf([
    "thin",
    "light",
    "regular",
    "medium",
    "bold",
    "black"
  ]),
  lineHeight: PropTypes.number,
  italic: PropTypes.bool,
  color: PropTypes.string,
  minLines: PropTypes.number,
  maxLines: PropTypes.number,
  align: PropTypes.oneOf(["left", "center", "right", "justify"]),
  ellipsis: PropTypes.bool,
  fadeLastLine: PropTypes.bool,
  unit: PropTypes.string
};

Text.defaultProps = {
  element: "p",
  fontSize: 1.3,
  fontWeight: "light",
  align: "left",
  ellipsis: false,
  fadeLastLine: false,
  unit: "rem"
};

export default withStyles(styles)(Text);
