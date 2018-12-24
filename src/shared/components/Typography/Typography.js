import React from 'react';
import PropTypes from 'prop-types';
import MuiTypography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

const styles = {
  paragraph: {
    margin: [[32, 0]],
  },
  italic: {
    fontStyle: 'italic',
  },
};

const Typography = ({ classes, italic, ...rest }) => (
  <MuiTypography
    classes={{ paragraph: classes.paragraph }}
    className={classnames({ [classes.italic]: italic })}
    {...rest}
  />
);

Typography.propTypes = {
  classes: PropTypes.shape().isRequired,
  italic: PropTypes.bool,
  variant: PropTypes.string,
};

Typography.defaultProps = {
  variant: 'body1',
  italic: false,
};

export default withStyles(styles)(Typography);
