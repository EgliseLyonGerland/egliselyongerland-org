import React from "react";
import PropTypes from "prop-types";
import { ButtonBase, withStyles } from "@material-ui/core";
import { transform } from "lodash";

const SIZES = {
  xxs: { fontSize: 14, height: 24, radius: 2 },
  xs: { fontSize: 16, height: 32, radius: 3 },
  sm: { fontSize: 16, height: 40, radius: 3 },
  md: { fontSize: 16, height: 48, radius: 4 },
  lg: { fontSize: 16, height: 56, radius: 4 },
  xl: { fontSize: 18, height: 64, radius: 4 },
  xxl: { fontSize: 20, height: 80, radius: 5 }
};

const styles = theme => ({
  root: {
    background: "#eee",
    transition: "background .2s",
    fontWeight: "normal"
  },
  normal: {},
  icon: {},
  rounded: {},
  circular: {},
  primary: {},
  secondary: {},
  white: {},
  disabled: {
    opacity: 0.7
  },
  plain: {
    "&$primary": {
      background: theme.palette.primary[500],
      color: "white",

      "&:hover": {
        background: theme.palette.primary[700]
      }
    },
    "&$secondary": {
      background: theme.palette.secondary[500],
      color: "white",

      "&:hover": {
        background: theme.palette.secondary[700]
      }
    },
    "&$white": {
      background: "white",
      color: "#222",

      "&:hover": {
        background: "#ddd"
      }
    }
  },
  outlined: {
    background: "none",
    border: "solid 1px",
    color: "white",

    "&$primary": {
      color: theme.palette.primary[500],
      borderColor: theme.palette.primary[500],

      "&:hover": {
        background: theme.palette.primary[500],
        color: "white"
      }
    },

    "&$secondary": {
      color: theme.palette.secondary[500],
      borderColor: theme.palette.secondary[500],

      "&:hover": {
        background: theme.palette.secondary[500],
        color: "white"
      }
    },

    "&$white": {
      "&:hover": {
        background: "rgba(255, 255, 255, 0.2)"
      }
    }
  },
  ghost: {
    background: "none",

    "&$primary": {
      color: theme.palette.primary[500],

      "&:hover": {
        background: theme.palette.primary[500],
        color: "white"
      }
    },

    "&$secondary": {
      color: theme.palette.secondary[500],

      "&:hover": {
        background: theme.palette.secondary[500],
        color: "white"
      }
    },

    "&$white": {
      color: "white",

      "&:hover": {
        background: "rgba(255, 255, 255, 0.2)"
      }
    }
  },
  ...transform(
    SIZES,
    (result, data, key) => {
      const padding = Math.floor(data.height / 2);

      result[key] = {
        fontSize: data.fontSize,
        height: data.height,
        lineHeight: `${data.fontSize}px`,

        [`&$normal`]: {
          padding: [[0, padding]]
        },

        [`&$rounded`]: {
          borderRadius: data.radius
        },

        [`&$circular`]: {
          borderRadius: data.height,
          padding: [[0, Math.round(padding * 1.2)]]
        },

        [`&$icon`]: {
          width: data.height,
          borderRadius: data.height
        }
      };
    },
    {}
  )
});

const Button = ({
  children,
  classes,
  type,
  size,
  corners,
  color,
  mode,
  className,
  ...rest
}) => {
  const finalClassName = [
    classes.root,
    classes[type],
    classes[size],
    classes[color],
    classes[corners],
    classes[mode],
    rest.disabled && classes.disabled,
    className
  ];

  return (
    <ButtonBase className={finalClassName.join(" ")} {...rest}>
      {children}
    </ButtonBase>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(Object.keys(SIZES)),
  type: PropTypes.oneOf(["normal", "icon"]),
  corners: PropTypes.oneOf(["straight", "rounded", "circular"]),
  color: PropTypes.oneOf(["primary", "secondary", "white"]),
  mode: PropTypes.oneOf(["plain", "outlined", "ghost"]),
  disabled: PropTypes.bool,
  className: PropTypes.string
};

Button.defaultProps = {
  size: "md",
  type: "normal",
  corners: "rounded",
  color: "primary",
  mode: "outlined",
  disabled: false,
  className: ""
};

export default withStyles(styles)(Button);
