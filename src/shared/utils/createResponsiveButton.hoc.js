import React, { Component } from 'react';
import Button, { stylesBySize } from 'components/Button/Button';
import { withStyles } from '@material-ui/core/styles';
import reduce from 'lodash/reduce';

export default (sizes, displayName = 'ResponsiveButton') => {
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

  @withStyles(styles, { name: displayName })
  class ResponsiveButton extends Component {
    render() {
      return <Button {...this.props} />;
    }
  }

  return ResponsiveButton;
};
