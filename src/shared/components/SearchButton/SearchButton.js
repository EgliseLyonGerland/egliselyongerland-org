import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  button: {
    textAlign: 'center',
    color: '#fff',
    cursor: 'pointer',
  },
};

const SearchButton = ({ onClicked, classes }) => (
  <div className={classes.button} onClick={() => onClicked()}>
    <span className="fa fa-search" />
  </div>
);

SearchButton.propTypes = {
  onClicked: PropTypes.func,
  classes: PropTypes.shape().isRequired,
};

SearchButton.defaultProps = {
  onClicked: noop,
};

export default withStyles(styles)(SearchButton);
