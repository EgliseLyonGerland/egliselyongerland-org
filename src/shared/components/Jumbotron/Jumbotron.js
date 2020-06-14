import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import picture from './default.jpg';

const getBonus = str => 1 + 1 / str.length;

const styles = theme => ({
  jumbotron: {
    background: theme.palette.primary[500],
    backgroundImage: 'url(/generic-bg.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    position: 'relative',

    '&:before': {
      content: '""',
      position: 'absolute',
      display: 'block',
      height: '100%',
      width: '100%',
      top: 0,
      left: 0,
      ...theme.jumbotronGradient,
    },
  },
  inner: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    background: 'rgba(0, 0, 0, 0.2)',
    minHeight: '50vh',
  },
  emptyRow1: {
    minHeight: theme.header.height,
  },
  emptyRow2: {
    height: '8vh',
    minHeight: 50,
  },
  emptyRow3: {
    height: '10vh',
    minHeight: 40,
  },
  title: {
    display: 'block',
    fontSize: 44,
    fontWeight: theme.typography.fontWeights.light,
    margin: [[0, 20]],
    textAlign: 'center',
    color: 'white',
    maxWidth: 790,
    padding: [[0, 20]],
  },
  '@media (orientation: landscape)': {
    inner: {
      minHeight: '70vh',
    },
  },
  '@media (min-height: 700px)': {
    inner: {
      minHeight: 480,
    },
  },
  [theme.breakpoints.down('sm')]: {
    emptyRow1: {
      minHeight: theme.header.sticky.height / 2,
    },
  },
  [theme.breakpoints.down('xs')]: {
    title: {
      fontSize: 24,
      fontWeight: theme.typography.fontWeights.regular,
    },
    emptyRow3: {
      height: '5vh',
    },
  },
});

const Jumbotron = ({ background, title, gravity, classes, children }) => (
  <div
    className={classes.jumbotron}
    style={{
      backgroundImage: `url(${background || picture})`,
      backgroundPosition: gravity,
    }}
  >
    <div className={classes.inner}>
      <div className={classes.emptyRow1} />
      <div className={classes.emptyRow2} />

      {title && (
        <div className={classes.title}>
          <h1 style={{ fontSize: `${getBonus(title)}em` }}>{title}</h1>
        </div>
      )}

      {children}

      <div className={classes.emptyRow3} />
    </div>
  </div>
);

Jumbotron.propTypes = {
  background: PropTypes.string,
  children: PropTypes.node,
  classes: PropTypes.shape().isRequired,
  gravity: PropTypes.oneOf([
    'top left',
    'top right',
    'top center',
    'bottom left',
    'bottom right',
    'bottom center',
    'center center',
    'center',
  ]),
  title: PropTypes.string,
};

Jumbotron.defaultProps = {
  background: null,
  title: null,
  children: null,
  gravity: 'center',
};

export default withStyles(styles)(Jumbotron);
