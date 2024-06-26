import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Parallax, ParallaxBanner } from 'react-scroll-parallax';
import { rem } from 'polished';

import RevealQueue from 'components/Animation/RevealQueue';
import routes from 'utils/routes';
import createResponsiveButton from 'utils/createResponsiveButton.hoc';

import worshipImage from '../images/worship.png';

const styles = ({ palette, breakpoints, jumbotronGradient }) => ({
  wrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    overflow: 'hidden',
    background: palette.primary[500],

    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: 1,
      ...jumbotronGradient,
    },
  },
  background: {
    '& div': {
      backgroundPosition: 'center right !important',
    },
  },
  inner: {
    position: 'relative',
    zIndex: 2,
    margin: [[32, 40]],
    color: 'white',
    maxWidth: 500,
  },
  text: {
    fontSize: rem(60),
    lineHeight: 1.2,
    letterSpacing: -1,
    display: 'inline-block',
    marginRight: 16,
  },
  button: {
    marginTop: 32,
  },
  [breakpoints.down('xs')]: {
    text: {
      fontSize: '8.5vmin',
    },
  },
  [breakpoints.down('xxs')]: {
    wrapper: {
      justifyContent: 'flex-start',
    },
    inner: {
      marginTop: 64,
    },
    text: {
      display: 'block',
      fontSize: '10vmin',
      letterSpacing: 'normal',
      marginRight: 8,
    },
  },
});

const ActionButton = createResponsiveButton(
  { xxs: 'sm', sm: 'lg' },
  'JumbotronActionButton',
);

const Jumbotron = ({ classes }) => (
  <div className={classes.wrapper}>
    <ParallaxBanner
      className={classes.background}
      layers={[
        {
          image: worshipImage,
          amount: 1,
          slowerScrollRate: true,
          expanded: false,
        },
      ]}
      style={{
        height: '100vh',
        position: 'absolute',
      }}
    />
    <Parallax
      className={classes.inner}
      offsetYMax={50}
      offsetYMin={-50}
      slowerScrollRate
    >
      <RevealQueue>
        <span className={classes.text}>Une</span>
        <span className={classes.text}>bonne</span>
        <span className={classes.text}>nouvelle</span>
        <span className={classes.text}>à connaître</span>
        <span className={classes.text}>et à faire</span>
        <span className={classes.text}>connaître.</span>
        <div className={classes.button}>
          <Link to={routes.discover()}>
            <ActionButton color="white">En savoir plus</ActionButton>
          </Link>
        </div>
      </RevealQueue>
    </Parallax>
  </div>
);

Jumbotron.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(Jumbotron);
