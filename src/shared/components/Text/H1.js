import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Text from './Text';

const styles = {
  h1: {
    marginBottom: 20,
    color: '#555',

    '&:after': {
      content: '""',
      display: 'block',
      maxWidth: 150,
      paddingTop: 23,
      backgroundImage:
        'linear-gradient(to right, #555 33%, rgba(255, 255, 255, 0) 0%)',
      backgroundPosition: '-10px bottom',
      backgroundSize: '10px 3px',
      backgroundRepeat: 'repeat-x',
    },
  },
};

const H1 = ({ classes, ...props }) => (
  <Text className={classes.h1} fontSize={2} fontWeight="light" {...props} />
);

export default withStyles(styles)(H1);
