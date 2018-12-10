import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import clearFix from 'polished/lib/mixins/clearFix';

const styles = theme => ({
  root: {
    ...clearFix(),
    display: 'flex',
    justifyContent: 'center',
  },
  inner: {
    width: '100%',
    maxWidth: 1200,
    margin: [[0, 32]],
    boxSizing: 'content-box',
  },
  withPaddings: {
    padding: 32,
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
  [theme.breakpoints.down('sm')]: {
    inner: {
      margin: [[0, 24]],
    },
    withPaddings: {
      padding: 24,
    },
  },
  [theme.breakpoints.down('xs')]: {
    inner: {
      margin: [[0, 16]],
    },
    withPaddings: {
      padding: 16,
    },
  },
  noMargins: {
    marginLeft: 0,
    marginRight: 0,
  },
});

const Container = ({
  children,
  className,
  style,
  classes,
  noMargins,
  withPaddings,
  ...props
}) => {
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];
  const size = sizes.reduce((prev, curr) => (props[curr] ? curr : prev), 'lg');

  return (
    <div className={classnames(classes.root, className)} style={style}>
      <div
        className={classnames(classes.inner, classes[size], {
          [classes.noMargins]: noMargins,
          [classes.withPaddings]: withPaddings,
        })}
      >
        {children}
      </div>
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.shape().isRequired,
  className: PropTypes.string,
  lg: PropTypes.bool,
  md: PropTypes.bool,
  noMargins: PropTypes.bool,
  sm: PropTypes.bool,
  style: PropTypes.shape(),
  withPaddings: PropTypes.bool,
  xl: PropTypes.bool,
  xs: PropTypes.bool,
};

Container.defaultProps = {
  className: null,
  style: null,
  noMargins: false,
  withPaddings: false,
  xs: false,
  sm: false,
  md: false,
  lg: false,
  xl: false,
};

export default withStyles(styles)(Container);
