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
  static propTypes = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.shape().isRequired,
    ...sizes.reduce(
      (acc, size) => ({
        ...acc,
        [size]: PropTypes.string,
      }),
      {},
    ),
  };

  static defaultProps = {
    classes: PropTypes.shape().isRequired,
    ...sizes.reduce(
      (acc, size) => ({
        ...acc,
        [size]: null,
      }),
      {},
    ),
  };

  render() {
    const { children, classes } = this.props;

    const [text, size] = sizes.reduce((acc, currentSize) => {
      const { [currentSize]: txt } = this.props;

      return txt ? [txt, currentSize] : acc;
    }, []);

    let props = {};

    if (text) {
      props = {
        className: classes[size],
        'data-alt': text,
      };
    }

    return (
      <span {...props}>
        <span>{children}</span>
      </span>
    );
  }
}

export default ResponsiveText;
