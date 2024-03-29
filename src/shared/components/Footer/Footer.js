import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  footer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    height: theme.footer.height,
    background: '#1f1f1f',
    textAlign: 'center',
    fontWeight: theme.typography.fontWeights.light,
    fontSize: '1.1rem',
  },
});

const Footer = ({ classes }) => (
  <div className={classes.footer}>
    <span>Copyright ©{new Date().getFullYear()} Église Lyon Gerland.</span>
  </div>
);

Footer.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(Footer);
