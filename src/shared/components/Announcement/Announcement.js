import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Checkbox from '@material-ui/core/Checkbox';
import { noop } from 'lodash';
import classnames from 'classnames';

import RevealQueue from 'components/Animation/RevealQueue';
import Hr from 'components/Hr/Hr';

// import wave1Picture from './images/wave1.png';
import wave1WidePicture from './images/wave1-wide.png';
import wave2Picture from './images/wave2.png';
import wave3Picture from './images/wave3.png';
import boxPicture from './images/box.svg';

const styles = {
  root: {
    background: '#FFCF40',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflowY: 'auto',
    color: '#16110D',
    fontWeight: 600,
    fontSize: 20,

    '& b': {
      fontWeight: 700,
    },
  },
  inner: {
    margin: 'auto',
    padding: [[100, 80, 80]],
    width: '100%',
    maxWidth: 880,
  },
  wave: {
    display: 'none',
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: 'no-repeat',
    // backgroundSize: 'contain',
    backgroundPosition: 'center bottom',
  },
  wave1: {
    // backgroundImage: `url(${wave1Picture})`,
    backgroundImage: `url(${wave1WidePicture})`,
  },
  // '@media (color-gamut: p3)': {
  //   wave1: {
  //     backgroundImage: `url(${wave1WidePicture})`,
  //   },
  // },
  wave2: {
    backgroundImage: `url(${wave2Picture})`,
  },
  wave3: {
    backgroundImage: `url(${wave3Picture})`,
  },
  box: {
    position: 'absolute',
    top: -20,
    left: 940,
  },
  heading: {
    display: 'block',
    fontWeight: 700,
    fontSize: 60,
    lineHeight: 1.3,
    textTransform: 'uppercase',
    textShadow: '4px 4px 0 rgba(255,255,255,0.80)',
  },
  excerpt: {
    margin: [[48, 0, 74]],
    lineHeight: 1.5,
    maxWidth: 600,
    fontSize: 22,
  },
  details: {
    position: 'relative',
    width: '100%',
    margin: [[0, -32]],

    '&:after': {
      content: '""',
      position: 'absolute',
      width: 'calc(100% + 64px)',
      height: '100%',
      top: -5,
      left: -5,
      border: 'solid 3px',
      zIndex: -1,
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      width: 'calc(100% + 64px)',
      height: '100%',
      top: 5,
      left: 5,
      background: '#FFE596',
      zIndex: -1,
    },
  },
  detailsContent: {
    padding: 32,
  },
  confirm: {
    margin: [[48, 0]],
  },
  button: {
    fontSize: 24,
    padding: 8,
    textShadow: '2px 2px 0 rgba(255,255,255,0.80)',
  },
  checkbox: {
    fontSize: 14,
    display: 'flex',
    alignItems: 'center',
  },
};

const Announcement = ({ classes, onCloseButtonClicked }) => {
  const [remind, setRemind] = useState(true);

  return (
    <div className={classes.root}>
      <div className={classnames(classes.wave, classes.wave3)} />
      <div className={classnames(classes.wave, classes.wave2)} />
      <div className={classnames(classes.wave, classes.wave1)} />
      <img alt="We're going to move" className={classes.box} src={boxPicture} />

      <div className={classes.inner}>
        <RevealQueue delay={0.2}>
          <h1 className={classes.heading}>Le 7 juillet,</h1>
          <h1 className={classes.heading}>ça déménage !</h1>
          <p className={classes.excerpt}>
            À partir du dimanche 7 juillet inclus, l'Église Lyon Gerland prend
            ses quartiers au Théâtre &ldquo; Lulu sur la colline &rdquo;, et la
            célébration passe au matin !
          </p>
          <div className={classes.details}>
            <div className={classes.detailsContent}>
              <p>
                <b>Culte le dimanche à 10h</b>
              </p>
              <Hr />
              <p>
                THÉÂTRE &ldquo; LULU SUR LA COLLINE &rdquo;
                <br />
                60 rue Victor Lagrange
                <br />
                69007 Lyon
              </p>
              <Hr />
              <p>
                <b>Accès :</b>
              </p>
              <p>
                Station Jean Macé
                <br />
                En métro B, en tram T2
                <br />
                En bus : 35, S3, Z16, C4, C7, C12 et C14
                <br />
                En Vélov’ : Station 7022 Jaurès / Lagrange"
              </p>
            </div>
          </div>
          <div className={classes.confirm}>
            <ButtonBase
              className={classes.button}
              onClick={onCloseButtonClicked}
            >
              J'AI COMPRIS
            </ButtonBase>
            <div className={classes.checkbox}>
              <Checkbox
                checked={remind}
                onChange={event => setRemind(event.target.checked)}
              />
              Mais rapellez-le moi quand même lors de ma prochaine visite
            </div>
          </div>
        </RevealQueue>
      </div>
    </div>
  );
};

Announcement.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  onCloseButtonClicked: PropTypes.func,
};

Announcement.defaultProps = {
  onCloseButtonClicked: noop,
};

export default withStyles(styles)(Announcement);
