import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { noop } from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';

import Container from 'components/Container/Container';
import Button from 'components/Button/Button';
import Typography from 'components/Typography/Typography';

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
    transition: theme.transitions.create('opacity', { duration: 700 }),
  },
  image: {
    width: 500,
    maxWidth: '100%',
    margin: [[0, 'auto', 40]],
    display: 'block',
  },
  confirm: {
    margin: [[48, 0]],
  },
  checkbox: {
    fontSize: 14,
    display: 'flex',
    alignItems: 'center',
    marginTop: 16,
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
      style={{
        transform: `translateY(${displayed ? 0 : '100vh'})`,
      }}
    >
      <div
        className={classes.inner}
        style={{
          opacity: displayed ? 1 : 0,
          transitionDelay: 0.7,
        }}
      >
        <Container sm>
          <Typography variant="h5" color="inherit">
            Bonne nouvelle !
          </Typography>

          <Typography paragraph color="inherit">
            Nous pouvons vous accueillir de nouveau pour la célébration du
            dimanche, à 10h, au Théâtre de Lulu sur la Colline,{' '}
            <b>à partir du dimanche 7 juin</b>.
          </Typography>
          <Typography paragraph color="inherit">
            Cette possibilité s'accompagne toutefois d'un protocole sanitaire
            précis, qui suit les directives officielles.
          </Typography>
          <Typography paragraph color="inherit">
            À noter en particulier : <b>le port obligatoire du masque</b> pour
            les plus de 11 ans dans l'enceinte du bâtiment, et{' '}
            <b>la limitation du nombre de fidèles présents</b> en fonction de la
            surface des lieux.
          </Typography>
          <Typography paragraph color="inherit">
            Pour toute question, n'hésitez pas à{' '}
            <Link to="/contact" onClick={handleClose}>
              nous contacter
            </Link>{' '}
            !
          </Typography>
          <Typography paragraph color="inherit">
            <a href="/assets/2020/06/plan_de_reprise_des_celebrations.pdf">
              &rarr; Consulter le protocole sanitaire
            </a>
            <br />
            <Link to="/contact" onClick={handleClose}>
              &rarr; S'inscrire pour assister au prochain culte
            </Link>
          </Typography>

          <div className={classes.confirm}>
            <Button onClick={handleClose} color="white">
              J'AI COMPRIS
            </Button>
            <div className={classes.checkbox}>
              <Checkbox
                checked={remind}
                color="secondary"
                onChange={event => setRemind(event.target.checked)}
              />
              Mais rapellez-le moi quand même lors de ma prochaine visite
            </div>
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
