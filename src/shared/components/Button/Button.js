import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import reduce from 'lodash/reduce';

const SIZES = {
  xxs: {
    fontSize: 12,
    height: 24,
    padding: 12,
    radius: 2,
  },
  xs: {
    fontSize: 14,
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
    fontSize: 20,
    height: 64,
    padding: 40,
    radius: 4,
  },
  xxl: {
    fontSize: 24,
    height: 80,
    padding: 56,
    radius: 5,
  },
};

export const stylesBySize = reduce(
  SIZES,
  (acc, data, key) => ({
    ...acc,
    [key]: {
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
    },
  }),
  {},
);

const styles = theme => ({
  root: {
    background: '#eee',
    transition: 'background .2s',
    fontWeight: theme.typography.fontWeights.regular,
    outline: 'none !important',
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
        background: theme.palette.primary[600],
      },
    },
    '&$secondary': {
      background: theme.palette.secondary[500],
      color: 'white',

      '&:hover': {
        background: theme.palette.secondary[600],
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
    color: 'white !important',

    '&$primary': {
      color: `${theme.palette.primary[500]} !important`,
      borderColor: theme.palette.primary[500],

      '&:hover': {
        background: theme.palette.primary[500],
        color: 'white !important',
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
  ...stylesBySize,
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
  size: PropTypes.oneOfType([
    PropTypes.oneOf(Object.keys(SIZES)),
    PropTypes.shape(),
  ]),
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
