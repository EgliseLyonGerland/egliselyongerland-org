import React from "react";
import PropTypes from "prop-types";
import { withStyles, withTheme } from "material-ui";
import classnames from "classnames";
import { clearfix } from "utils/styles";
import { reduce } from "lodash";

const styles = theme => ({
  hr: {
    ...clearfix(),
    border: 0
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
    display: "inline-block"
  }
});

const Hr = ({
  children,
  line,
  color,
  opacity,
  inline,
  width,
  multiplier,
  classes,
  theme: {
    hr: { sizes }
  },
  ...props
}) => {
  const className = classnames([
    classes.hr,
    line && classes.line,
    inline && classes.inline
  ]);

  const style = {};

  // Resolve height
  let height;

  if (multiplier) {
    height = multiplier * 8;
  } else {
    height = reduce(
      sizes,
      (prev, height, size) => (props[size] ? height : prev),
      sizes.md
    );
  }

  if (inline) {
    style.margin = `0 ${height / 2}px`;
  } else {
    style.margin = `${height / 2}px 0`;
  }

  if (line) {
    style.backgroundImage = `linear-gradient(to right, ${color} 33%, transparent 0%)`;

    if (opacity) {
      style.opacity = opacity;
    }

    if (width) {
      style.width = width;
    }
  }

  return <div {...{ className, style }}>{children}</div>;
};

Hr.propTypes = {
  children: PropTypes.any,
  line: PropTypes.bool,
  color: PropTypes.string,
  opacity: PropTypes.number,
  inline: PropTypes.bool,
  width: PropTypes.string,
  multiplier: PropTypes.number
};

Hr.defaultProps = {
  line: false,
  color: "white",
  opacity: 1,
  inline: false
};

export default withStyles(styles)(withTheme()(Hr));
