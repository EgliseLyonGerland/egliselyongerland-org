import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import reduce from 'lodash/reduce';
import mapValues from 'lodash/mapValues';

const styles = ({ palette }) => ({
  root: {
    transition: 'color .5s',

    'a&': {
      '&:active, &:visited': {
        color: 'inherit',
      },
      ...reduce(
        palette.text,
        (acc, color, name) => ({
          ...acc,
          [`&$${name}`]: { color },
        }),
        {},
      ),
      '&:hover': {
        color: palette.primary[500],
      },
    },
  },
  ...mapValues(palette.text, () => ({})),
});

@withStyles(styles)
class Link extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
    className: PropTypes.string,
    color: PropTypes.string,
  };

  static defaultProps = {
    className: null,
    color: 'primary',
  };

  render() {
    const { className, classes, color, ...rest } = this.props;

    return (
      <NavLink
        className={classnames(classes.root, classes[color], className)}
        {...rest}
      />
    );
  }
}

export default Link;
