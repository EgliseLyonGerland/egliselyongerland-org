import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui";
import classnames from "classnames";
import { clearfix } from "utils/styles";
import { transform } from "lodash";

const SIZES = ["nm", "xs", "sm", "md", "lg", "xl"];

const styles = theme => ({
  hr: {
    ...clearfix(),
    border: 0,
    margin: [[theme.hr.sizes.md / 2, 0]]
  },
  line: {
    display: "block",
    height: 4,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundPosition: "-10px bottom",
    backgroundSize: "12px 4px",
    backgroundRepeat: "repeat-x"
  },
  inline: {
    display: "inline-block",
    margin: [[0, theme.hr.sizes.md / 2]],

    ...transform(
      theme.hr.sizes,
      (result, size, name) => {
        result[`& \$${name}`] = {
          margin: [[0, size / 2]]
        };
      },
      {}
    )
  },
  ...transform(
    theme.hr.sizes,
    (result, size, name) => {
      result[name] = {
        marginTop: size / 2,
        marginBottom: size / 2
      };
    },
    {}
  )
});

const Hr = ({
  children,
  line,
  color,
  opacity,
  inline,
  width,
  classes,
  ...props
}) => {
  // Check size
  const size = SIZES.reduce((prev, curr) => (props[curr] ? curr : prev), "md");

  // Build new props
  const newProps = {};

  newProps.className = classnames(
    classes.hr,
    classes[size],
    line && classes.line,
    inline && classes.inline
  );

  if (line) {
    newProps.style = {
      backgroundImage: `linear-gradient(to right, ${color} 33%, transparent 0%)`
    };

    if (opacity) {
      newProps.opacity = opacity;
    }

    if (width) {
      newProps.style.width = width;
    }
  }

  return <div {...newProps}>{children}</div>;
};

Hr.propTypes = {
  children: PropTypes.any,
  line: PropTypes.bool,
  color: PropTypes.string,
  opacity: PropTypes.number,
  inline: PropTypes.bool,
  width: PropTypes.string
};

Hr.defaultProps = {
  line: false,
  color: "white",
  opacity: 1,
  inline: false
};

export default withStyles(styles)(Hr);
