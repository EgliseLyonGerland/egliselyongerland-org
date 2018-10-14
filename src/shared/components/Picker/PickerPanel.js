import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import lighten from 'polished/lib/color/lighten';

import Text from 'components/Text/Text';

const styles = theme => ({
  panel: {
    border: [[1, 'solid']],
    borderColor: [['#e5e6e9', '#dfe0e4', '#d0d1d5']],
    background: 'white',
  },
  title: {
    borderBottom: [[theme.picker.borderColor, 'solid', 1]],
    background: lighten(0.05, theme.picker.borderColor),
    padding: [[7, 15]],
  },
});

const PickerPanel = ({ children, title, classes }) => (
  <div className={classes.panel}>
    {title && (
      <div className={classes.title}>
        <Text fontSize={1} fontWeight="medium">
          {title}
        </Text>
      </div>
    )}

    {children}
  </div>
);

PickerPanel.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.shape().isRequired,
  title: PropTypes.string,
};

PickerPanel.defaultProps = {
  title: null,
};

export default withStyles(styles)(PickerPanel);
