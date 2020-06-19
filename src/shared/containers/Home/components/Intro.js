import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink as Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import routes from 'utils/routes';
import worshipImage from '../images/worship.png';

const bezier = 'cubic-bezier(0.4, 0, 0.2, 1)';

const styles = ({
  palette: { primary, secondary },
  transitions,
  jumbotronGradient,
}) => ({
  root: {
    position: 'relative',
    width: '100vw',
    height: '100vh',
    backgroundColor: primary[500],
    backgroundImage: `url(${worshipImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center right',

    '&:before': {
      content: '""',
      position: 'absolute',
      width: '100%',
      height: '100%',
      ...jumbotronGradient,
    },
  },
  inner: {
    position: 'relative',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  content: {},
  text: {
    fontFamily: "'Barlow Condensed', sans-serif",
    mixBlendMode: 'overlay',
  },
  textLine: {
    color: 'white',
    height: 'min(16vw, 12vh)',
    fontSize: 'min(16vw, 12vh)',
    letterSpacing: -2,
    lineHeight: 1,
    margin: [[8, 0]],
    overflow: 'hidden',

    '& span': {
      display: 'block',
      transition: transitions.create('transform', { duration: 1000 }),
    },
  },
  linkWrapper: {
    marginTop: 32,
    height: 'min(10vw, 8vh)',
    overflow: 'hidden',

    '& > div': {
      transform: 'translateY(100%)',
      transition: transitions.create('transform', { duration: 1000 }),
    },
  },
  link: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: 'min(10vw, 8vh)',
    lineHeight: 1,
    letterSpacing: -2,
    color: 'white',
    cursor: 'pointer',
    verticalAlign: 'middle',
    backgroundImage: `linear-gradient(to right, ${secondary[400]}, ${
      secondary[400]
    } 50%, white 50%)`,
    backgroundSize: '200% 100%',
    backgroundPosition: '100%',
    transition: transitions.create('background-position', { duration: 300 }),
    '-webkit-background-clip': 'text',
    '-webkit-text-fill-color': 'transparent',

    '& svg': {
      display: 'inline-block',
      transition: transitions.create(['transform', 'fill'], { duration: 300 }),
      transitionTimingFunction: bezier,
      transitionDelay: '0s',
      marginLeft: 8,
      marginBottom: '1.5%',
      height: 'min(8vw, 6vh)',
      fill: 'white',
      verticalAlign: 'middle',
    },

    '&:hover': {
      backgroundPosition: '0%',

      '& svg': {
        fill: '#4CEDC9',
        transform: 'translateX(16px)',
        transitionDelay: '.1s',
      },
    },
  },
});

const Chevron = React.memo(() => (
  <svg viewBox="0 0 22 42" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.053396.07254723l13 17.99999997c1.215393 1.6828513 1.260407 3.9333725.135044 5.6582734l-.135044.1966322-13 18-8.106792-5.8549056L10.832 20.999-.053396 5.92745277 8.053396.07254723z" />
  </svg>
));

const Intro = ({ classes, width }) => {
  const [displayed, setDisplayed] = useState(false);
  const [lines, setLines] = useState([]);

  useEffect(
    () => {
      if (isWidthDown('sm', width)) {
        setLines([
          'UNE BONNE',
          'NOUVELLE',
          'À CONNAÎTRE',
          'ET À FAIRE',
          'CONNAÎTRE',
        ]);
      } else {
        setLines(['UNE BONNE NOUVELLE', 'À CONNAÎTRE ET', 'À FAIRE CONNAÎTRE']);
      }
    },
    [width],
  );

  useEffect(() => {
    setTimeout(() => {
      setDisplayed(true);
    }, 1000);
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.inner}>
        <div className={classes.content}>
          <div className={classes.text}>
            {lines.map((line, index) => (
              <div key={line} className={classes.textLine}>
                <span
                  style={{
                    transform: `translateY(${displayed ? 0 : '100%'})`,
                    transitionDelay: `${lines.length * 0.2 - index * 0.2}s`,
                  }}
                >
                  {line}
                </span>
              </div>
            ))}
          </div>
          <div className={classes.linkWrapper}>
            <div
              style={{
                transform: `translateY(${displayed ? 0 : '-100%'})`,
                transitionDelay: `${lines.length * 0.2}s`,
              }}
            >
              <Link className={classes.link} to={routes.discover()}>
                EN SAVOIR PLUS <Chevron />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Intro.propTypes = {
  classes: PropTypes.shape().isRequired,
  width: PropTypes.string.isRequired,
};

export default withWidth()(withStyles(styles)(Intro));
