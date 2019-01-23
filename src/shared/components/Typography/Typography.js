import React from 'react';
import PropTypes from 'prop-types';
import MuiTypography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

const styles = theme => ({
  paragraph: {
    margin: [[32, 0]],
  },
  italic: {
    fontStyle: 'italic',
  },
  bold: {
    fontWeight: theme.typography.fontWeights.medium,
  },
});

const Typography = ({ classes, italic, bold, ...rest }) => (
  <MuiTypography
    classes={{ paragraph: classes.paragraph }}
    className={classnames({
      [classes.italic]: italic,
      [classes.bold]: bold,
    })}
    {...rest}
  />
);

Typography.propTypes = {
  bold: PropTypes.bool,
  classes: PropTypes.shape().isRequired,
  italic: PropTypes.bool,
  variant: PropTypes.string,
};

Typography.defaultProps = {
  variant: 'body1',
  italic: false,
  bold: false,
};

export default withStyles(styles)(Typography);
