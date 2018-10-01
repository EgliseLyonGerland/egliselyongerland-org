import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  wrapper: {
    background: theme.palette.primary[700],
  },
});

const Item = ({ width, height, margin, right, center, inline, classes }) => {
  const inlineStyles = {
    width,
    height,
    borderRadius: height,
    marginBottom: margin,
  };

  if (right) {
    inlineStyles.marginLeft = 'auto';
  } else if (center) {
    inlineStyles.marginLeft = 'auto';
    inlineStyles.marginRight = 'auto';
  }

  if (inline) {
    inlineStyles.display = 'inline-block';
  }

  return <div className={classes.wrapper} style={inlineStyles} />;
};

Item.propTypes = {
  center: PropTypes.bool,
  classes: PropTypes.shape().isRequired,
  height: PropTypes.number,
  inline: PropTypes.bool,
  margin: PropTypes.number,
  right: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Item.defaultProps = {
  width: '100%',
  height: 35,
  margin: 35,
  right: false,
  center: false,
  inline: false,
};

export default withStyles(styles)(Item);
