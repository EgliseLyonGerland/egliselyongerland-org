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

Link.propTypes = {
  classes: PropTypes.shape(),
  className: PropTypes.string,
  color: PropTypes.string,
};

Link.defaultProps = {
  classes: {},
  className: null,
  color: 'primary',
};

export default Link;
