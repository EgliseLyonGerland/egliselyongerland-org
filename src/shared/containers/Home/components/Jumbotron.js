import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Parallax, ParallaxBanner } from 'react-scroll-parallax';
import { rem } from 'polished';

import RevealQueue from 'components/Animation/RevealQueue';
import routes from 'utils/routes';
import createResponsiveButton from 'utils/createResponsiveButton.hoc';

import worship from '../images/worship.jpg';

const styles = ({ palette: { primary }, typography, breakpoints }) => ({
  wrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    overflow: 'hidden',

    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      backgroundColor: primary[600],
      backgroundImage: `linear-gradient(-180deg, ${primary[700]} 0%, ${
        primary[500]
      } 100%)`,
      opacity: 0.9,
      zIndex: 1,
    },
  },
  inner: {
    width: '60%',
    position: 'relative',
    zIndex: 2,
    fontSize: rem(60),
    lineHeight: 1.2,
    margin: [[32, 40]],
    color: 'white',
  },
  word: {
    display: 'inline-block',
    marginRight: 16,
    fontWeight: typography.fontWeights.medium,
  },
  button: {
    marginTop: 32,
  },
  [breakpoints.down('xs')]: {
    inner: {
      width: '80%',
    },
  },
  [breakpoints.down('xxs')]: {
    wrapper: {
      justifyContent: 'flex-start',
    },
    inner: {
      width: '100%',
      fontSize: '11vmin',
    },
    word: {
      display: 'block',
    },
  },
});

const ActionButton = createResponsiveButton(
  { xxs: 'md', sm: 'lg' },
  'JumbotronActionButton',
);

const words = [
  'une',
  'église',
  'chrétienne,',
  'protestante,',
  'réformée,',
  'évangélique.',
];

const fixHeight = ref => {
  if (ref) {
    /* eslint-disable no-param-reassign */
    ref.style.height = `${ref.offsetHeight}px`;
    ref.style.minHeight = `inherit`;
    /* eslint-enable no-param-reassign */
  }
};

const Jumbotron = ({ classes }) => (
  <div ref={fixHeight} className={classes.wrapper}>
    <ParallaxBanner
      layers={[
        {
          image: worship,
          amount: 0.2,
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
        {words.map((word, index) => (
          <div key={word} className={classes.words}>
            <span style={{ opacity: 1 - index * 0.1 }}>{word}</span>
          </div>
        ))}
        <div className={classes.button}>
          <Link to={routes.church()}>
            <ActionButton color="white" corners="circular">
              En savoir plus
            </ActionButton>
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
