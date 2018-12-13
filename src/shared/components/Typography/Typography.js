import React from 'react';
import PropTypes from 'prop-types';
import MuiTypography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  paragraph: {
    margin: [[32, 0]],
  },
};

const Typography = ({ classes, ...rest }) => (
  <MuiTypography classes={classes} {...rest} />
);

Typography.propTypes = {
  classes: PropTypes.shape().isRequired,
  variant: PropTypes.string,
};

Typography.defaultProps = {
  variant: 'body1',
};

export default withStyles(styles)(Typography);
