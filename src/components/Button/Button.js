import React from "react";
import PropTypes from "prop-types";
import { Button as ButtonBase, withStyles } from "material-ui";
import { transform, noop } from "lodash";

const SIZES = {
  xxs: { fontSize: 14, height: 26 },
  xs: { fontSize: 16, height: 32 },
  sm: { fontSize: 18, height: 36 },
  md: { fontSize: 20, height: 50 },
  lg: { fontSize: 22, height: 56 },
  xl: { fontSize: 24, height: 62 },
  xxl: { fontSize: 26, height: 70 }
};

const styles = theme => ({
  root: {
    lineHeight: 0,
    fontWeight: 300,
    textTransform: "none",
    minWidth: "auto",
    minHeight: "auto"
  },
  bordered: {
    border: [["solid", 1]]
  },
  raised: {
    border: 0,
    boxShadow: "none",

    "&$disabled": {
      background: "rgba(255,255,255,0.5)"
    }
  },
  disabled: {
    background: "red"
  },
  ...transform(
    SIZES,
    (result, data, key) => {
      const padding = Math.floor(data.height / 2.5);

      result[key] = {
        fontSize: data.fontSize,
        height: data.height,
        padding: [[0, padding]]
      };

      result[`${key}Rounded`] = {
        borderRadius: Math.floor(data.height / 5)
      };

      result[`${key}Circled`] = {
        borderRadius: data.height,
        padding: [[0, Math.round(padding * 1.2)]]
      };
    },
    {}
  )
});

const Button = props => {
  const {
    children,
    classes,
    className,
    bordered,
    disabled,
    corners,
    size,
    onClick,
    ...rest
  } = props;

  const finalClassName = [classes[size]];

  if (bordered) {
    finalClassName.push(classes.bordered);
  }

  if (disabled) {
    finalClassName.push(classes.disabled);
  }

  switch (corners) {
    case "rounded":
      finalClassName.push(classes[`${size}Rounded`]);
      break;
    case "circled":
      finalClassName.push(classes[`${size}Circled`]);
      break;
    default:
  }

  if (className) {
    finalClassName.push(className);
  }

  return (
    <ButtonBase
      className={finalClassName.join(" ")}
      classes={{
        root: classes.root,
        raised: classes.raised
      }}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </ButtonBase>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  bordered: PropTypes.bool,
  corners: PropTypes.oneOf(["squared", "rounded", "circled"]),
  size: PropTypes.oneOf(Object.keys(SIZES)),
  className: PropTypes.string,
  onClick: PropTypes.func
};

Button.defaultProps = {
  bordered: false,
  corners: "squared",
  size: "md",
  className: null,
  onClick: noop
};

export default withStyles(styles)(Button);
