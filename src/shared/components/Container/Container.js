import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { clearFix } from 'polished';

const styles = theme => ({
  container: {
    ...clearFix(),
    marginRight: 'auto',
    marginLeft: 'auto',
    paddingLeft: 35,
    paddingRight: 35,
    maxWidth: 1200,
  },
  xs: {
    maxWidth: 500,
  },
  sm: {
    maxWidth: 700,
  },
  md: {
    maxWidth: 900,
  },
  lg: {
    maxWidth: 1100,
  },
  xl: {
    maxWidth: 1300,
  },
  [theme.breakpoints.down('xs')]: {
    container: {
      paddingLeft: 25,
      paddingRight: 25,
    },
  },
  [theme.breakpoints.down('sm')]: {
    container: {
      paddingLeft: 15,
      paddingRight: 15,
    },
  },
});

const Container = ({ children, className, style, classes, ...props }) => {
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];
  const size = sizes.reduce((prev, curr) => (props[curr] ? curr : prev), 'lg');

  // Build new props
  const newProps = {
    style,
    className: classnames(className, classes.container, classes[size]),
  };

  return <div {...newProps}>{children}</div>;
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.shape().isRequired,
  className: PropTypes.string,
  lg: PropTypes.bool,
  md: PropTypes.bool,
  sm: PropTypes.bool,
  style: PropTypes.shape(),
  xl: PropTypes.bool,
  xs: PropTypes.bool,
};

Container.defaultProps = {
  className: null,
  style: null,
  xs: false,
  sm: false,
  md: false,
  lg: false,
  xl: false,
};

export default withStyles(styles)(Container);
