import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, withTheme } from '@material-ui/core/styles';
import classnames from 'classnames';
import clearFix from 'polished/lib/mixins/clearFix';
import reduce from 'lodash/reduce';

const styles = {
  hr: {
    ...clearFix(),
    display: 'block',
    border: 0,
  },
  line: {
    height: 4,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundPosition: '-10px bottom',
    backgroundSize: '12px 4px',
    backgroundRepeat: 'repeat-x',
    margin: [[0, 'auto']],
  },
  inline: {
    display: 'inline-block',
  },
};

const Hr = ({
  children,
  line,
  color,
  opacity,
  inline,
  width,
  multiplier,
  classes,
  theme: {
    hr: { sizes },
  },
  ...props
}) => {
  const className = classnames([
    classes.hr,
    line && classes.line,
    inline && classes.inline,
  ]);

  const style = {};

  // Resolve height
  let height;

  if (multiplier) {
    height = multiplier * 8;
  } else {
    height = reduce(
      sizes,
      (acc, curr, size) => (props[size] ? curr : acc),
      sizes.md,
    );
  }

  if (inline) {
    style.margin = `0 ${height / 2}px`;
  } else {
    style.margin = `${height / 2}px auto`;
  }

  if (line) {
    style.backgroundImage = `linear-gradient(to right, ${color} 33%, transparent 0%)`;

    if (opacity) {
      style.opacity = opacity;
    }

    if (width) {
      style.width = width;
    }
  }

  return <span {...{ className, style }}>{children}</span>;
};

Hr.propTypes = {
  children: PropTypes.node,
  color: PropTypes.string,
  inline: PropTypes.bool,
  line: PropTypes.bool,
  multiplier: PropTypes.number,
  opacity: PropTypes.number,
  width: PropTypes.string,
};

Hr.defaultProps = {
  children: null,
  width: null,
  multiplier: null,
  line: false,
  color: 'white',
  opacity: 1,
  inline: false,
};

export default withStyles(styles)(withTheme()(Hr));
