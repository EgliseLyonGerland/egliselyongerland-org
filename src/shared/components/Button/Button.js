import React from 'react';
import PropTypes from 'prop-types';
import { ButtonBase, withStyles } from '@material-ui/core';
import { transform } from 'lodash';

const SIZES = {
  xxs: {
    fontSize: 14,
    height: 24,
    padding: 8,
    radius: 2,
  },
  xs: {
    fontSize: 16,
    height: 32,
    padding: 16,
    radius: 3,
  },
  sm: {
    fontSize: 16,
    height: 40,
    padding: 20,
    radius: 3,
  },
  md: {
    fontSize: 16,
    height: 48,
    padding: 24,
    radius: 3,
  },
  lg: {
    fontSize: 16,
    height: 56,
    padding: 28,
    radius: 4,
  },
  xl: {
    fontSize: 18,
    height: 64,
    padding: 32,
    radius: 4,
  },
  xxl: {
    fontSize: 20,
    height: 80,
    padding: 40,
    radius: 5,
  },
};

const styles = theme => ({
  root: {
    background: '#eee',
    transition: 'background .2s',
    fontWeight: theme.typography.fontWeights.regular,
  },
  normal: {},
  icon: {},
  rounded: {},
  circular: {},
  primary: {},
  secondary: {},
  white: {},
  disabled: {
    opacity: 0.7,
  },
  plain: {
    '&$primary': {
      background: theme.palette.primary[500],
      color: 'white',

      '&:hover': {
        background: theme.palette.primary[700],
      },
    },
    '&$secondary': {
      background: theme.palette.secondary[500],
      color: 'white',

      '&:hover': {
        background: theme.palette.secondary[700],
      },
    },
    '&$white': {
      background: 'white',
      color: '#222',

      '&:hover': {
        background: '#ddd',
      },
    },
  },
  outlined: {
    background: 'none',
    border: 'solid 1px',
    color: 'white',

    '&$primary': {
      color: theme.palette.primary[500],
      borderColor: theme.palette.primary[500],

      '&:hover': {
        background: theme.palette.primary[500],
        color: 'white',
      },
    },

    '&$secondary': {
      color: theme.palette.secondary[500],
      borderColor: theme.palette.secondary[500],

      '&:hover': {
        background: theme.palette.secondary[500],
        color: 'white',
      },
    },

    '&$white': {
      '&:hover': {
        background: 'rgba(255, 255, 255, 0.2)',
      },
    },
  },
  ghost: {
    background: 'none',

    '&$primary': {
      color: theme.palette.primary[500],

      '&:hover': {
        background: theme.palette.primary[500],
        color: 'white',
      },
    },

    '&$secondary': {
      color: theme.palette.secondary[500],

      '&:hover': {
        background: theme.palette.secondary[500],
        color: 'white',
      },
    },

    '&$white': {
      color: 'white',

      '&:hover': {
        background: 'rgba(255, 255, 255, 0.2)',
      },
    },
  },
  ...transform(
    SIZES,
    (result, data, key) => {
      // eslint-disable-next-line no-param-reassign
      result[key] = {
        fontSize: data.fontSize,
        height: data.height,
        lineHeight: `${data.fontSize}px`,

        '&$normal': {
          padding: [[0, data.padding]],
        },

        '&$rounded': {
          borderRadius: data.radius,
        },

        '&$circular': {
          borderRadius: data.height,
        },

        '&$icon': {
          width: data.height,
          borderRadius: data.height,
        },
      };
    },
    {},
  ),
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
    className,
  ];

  return (
    <ButtonBase className={finalClassName.join(' ')} {...rest}>
      {children}
    </ButtonBase>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  color: PropTypes.oneOf(['primary', 'secondary', 'white']),
  corners: PropTypes.oneOf(['straight', 'rounded', 'circular']),
  disabled: PropTypes.bool,
  mode: PropTypes.oneOf(['plain', 'outlined', 'ghost']),
  size: PropTypes.oneOf(Object.keys(SIZES)),
  type: PropTypes.oneOf(['normal', 'icon']),
};

Button.defaultProps = {
  size: 'md',
  type: 'normal',
  corners: 'rounded',
  color: 'primary',
  mode: 'outlined',
  disabled: false,
  className: '',
};

export default withStyles(styles)(Button);
