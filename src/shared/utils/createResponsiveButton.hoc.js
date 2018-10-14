import React, { Component } from 'react';
import Button, { stylesBySize } from 'components/Button/Button';
import { withStyles } from '@material-ui/core/styles';
import reduce from 'lodash/reduce';

export default sizes => {
  const styles = theme => ({
    ...reduce(
      sizes,
      (acc, size, breakpointName) => ({
        ...acc,
        [theme.breakpoints.up(breakpointName)]: {
          normal: {},
          rounded: {},
          circular: {},
          icon: {},
          root: {
            ...stylesBySize[size],
          },
        },
      }),
      {},
    ),
  });

  @withStyles(styles)
  class ResponsiveButton extends Component {
    render() {
      return <Button {...this.props} />;
    }
  }

  return ResponsiveButton;
};
