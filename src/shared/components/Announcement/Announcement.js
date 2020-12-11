import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NavLink as Link } from 'react-router-dom';
import { noop } from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';

import Container from 'components/Container/Container';
import Button from 'components/Button/Button';
import Typography from 'components/Typography/Typography';
import routes from 'utils/routes';

const styles = theme => ({
  root: {
    background: theme.palette.primary[500],
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 100,
    padding: [[48, 0]],
    color: 'white',
    overflowY: 'auto',
    transition: theme.transitions.create('transform', { duration: 700 }),

    '& a': {
      color: theme.palette.secondary[400],
    },
  },
  inner: {
    transition: theme.transitions.create('opacity', {
      duration: 700,
      delay: 700,
    }),
  },
  image: {
    width: 500,
    maxWidth: '100%',
    margin: [[0, 'auto', 40]],
    display: 'block',
  },
  confirm: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    margin: [[48, 0]],
  },
  button: {
    marginRight: 16,
  },
  checkbox: {
    fontSize: 16,
    display: 'flex',
    alignItems: 'center',
    margin: [[16, 0]],
  },
  crucial: {
    fontWeight: theme.typography.fontWeights.medium,
    background: theme.palette.secondary[400],
    color: theme.palette.primary[500],
    padding: [[0, 8]],
    margin: [[0, 8]],
    borderRadius: 4,
  },
  noLeftMargin: {
    marginLeft: 0,
  },
});

const Announcement = ({ classes, onCloseButtonClicked }) => {
  const [remind, setRemind] = useState(true);
  const [displayed, setDisplayed] = useState(false);

  const handleClose = () => {
    setDisplayed(false);

    setTimeout(() => {
      onCloseButtonClicked(remind);
    }, 1200);
  };

  useEffect(() => {
    setTimeout(() => {
      setDisplayed(true);
    }, 0);
  }, []);

  return (
    <div
      className={classes.root}
      style={{ transform: `translateY(${displayed ? 0 : '100vh'})` }}
    >
      <div className={classes.inner} style={{ opacity: displayed ? 1 : 0 }}>
        <Container sm>
          <>
            <Typography variant="h5" color="inherit">
              <span role="img" aria-label="Attention">
                ⚠️
              </span>{' '}
              Information CORONAVIRUS{' '}
              <span role="img" aria-label="Attention">
                ⚠️
              </span>
            </Typography>
            <Typography paragraph color="inherit">
              En raison de la situation sanitaire liée à l'épidémie de Covid-19,
              la capacité d'accueil du public dans notre lieu de culte est
              actuellement limitée, et{' '}
              <span className={classes.crucial}>l'inscription préalable</span>{' '}
              par e-mail ou par SMS (voir{' '}
              <Link to={routes.contact()}>page contact</Link>) est par
              conséquent obligatoire pour pouvoir assister à la célébration. Il
              est aussi possible de suivre la{' '}
              <span className={classes.crucial}>célébration en direct</span>{' '}
              chaque dimanche à 10h, par le lien suivant :<br />
              <br />
              <a
                href="https://links.egliselyongerland.org/link/live"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://links.egliselyongerland.org/link/live
              </a>
            </Typography>
          </>

          <div className={classes.confirm}>
            <Button
              className={classes.button}
              onClick={handleClose}
              color="white"
            >
              J'AI COMPRIS
            </Button>
            <span className={classes.checkbox}>
              <Checkbox
                checked={remind}
                color="secondary"
                onChange={event => setRemind(event.target.checked)}
              />
              Afficher lors de ma prochaine visite
            </span>
          </div>
        </Container>
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
