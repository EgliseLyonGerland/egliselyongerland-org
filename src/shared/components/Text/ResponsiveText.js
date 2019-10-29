import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import theme from 'config/theme';

const {
  breakpoints: { keys: sizes },
} = theme;

const styles = ({ breakpoints }) =>
  sizes.reduce(
    (acc, size) => ({
      ...acc,
      [size]: {},
      [breakpoints.down(size)]: {
        [size]: {
          '& > span': {
            display: 'none',
          },
          '&:before': {
            content: 'attr(data-alt)',
          },
        },
      },
    }),
    {},
  );

@withStyles(styles)
class ResponsiveText extends Component {
  render() {
    const { children, classes } = this.props;

    const [text, size] = sizes.reduce((acc, currentSize) => {
      const { [currentSize]: txt } = this.props;

      return txt ? [txt, currentSize] : acc;
    }, []);

    let className;
    let dataAlt;

    if (text) {
      className = classes[size];
      dataAlt = text;
    }

    return (
      <span className={className} data-alt={dataAlt}>
        <span>{children}</span>
      </span>
    );
  }
}

ResponsiveText.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.shape(),
  ...sizes.reduce(
    (acc, size) => ({
      ...acc,
      [size]: PropTypes.string,
    }),
    {},
  ),
};

ResponsiveText.defaultProps = {
  classes: {},
  ...sizes.reduce(
    (acc, size) => ({
      ...acc,
      [size]: null,
    }),
    {},
  ),
};

export default ResponsiveText;
