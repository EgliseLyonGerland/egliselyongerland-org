import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { noop } from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import classnames from 'classnames';

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
          {new Date() < new Date('2020/09/20 20:00') ? (
            <>
              <Typography variant="h5" color="inherit">
                <span role="img" aria-label="Attention">
                  ⚠️
                </span>{' '}
                ATTENTION : TRÈS IMPORTANT{' '}
                <span role="img" aria-label="Attention">
                  ⚠️
                </span>
              </Typography>
              <Typography paragraph color="inherit">
                Une situation indépendante de notre volonté nous oblige à
                <span className={classes.crucial}>
                  déplacer la célébration de ce dimanche 20 septembre à
                  l'après-midi, à 16h30
                </span>
                .
              </Typography>
              <Typography paragraph color="inherit">
                Exceptionnellement, il n'y aura donc pas de célébration le matin
                à 10h.
              </Typography>
              <Typography paragraph color="inherit">
                Le protocole sanitaire reste en vigueur : l'inscription
                préalable est nécessaire pour pouvoir assister au culte, et le
                port du masque demeure obligatoire à l'intérieur des locaux.
              </Typography>
              <Typography paragraph color="inherit">
                Merci de votre compréhension !
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="h5" color="inherit">
                Information COVID-19
              </Typography>

              <Typography paragraph color="inherit">
                À partir du 1er septembre, et suivant les consignes officielles,{' '}
                <span className={classes.crucial}>l'inscription préalable</span>{' '}
                est nécessaire pour pouvoir assister à la célébration le
                dimanche à 10h au Théâtre de Lulu sur la Colline.
              </Typography>
              <Typography paragraph color="inherit">
                <span
                  className={classnames(classes.crucial, classes.noLeftMargin)}
                >
                  Le port du masque
                </span>{' '}
                est également obligatoire pour toute personne de plus de 11 ans
                à l'intérieur du bâtiment.
              </Typography>
              <Typography paragraph color="inherit">
                Les inscriptions peuvent se faire par SMS au 06.68.36.77.65, ou
                par voie électronique à{' '}
                <a href="mailto:contact@egliselyongerland.org">
                  contact@egliselyongerland.org
                </a>
                . Merci de préciser le nombre de personnes que vous inscrivez,
                avec leur nom.
              </Typography>
              <Typography paragraph color="inherit">
                Pour toute question, n'hésitez pas à{' '}
                <Link to="/contact" onClick={handleClose}>
                  nous contacter
                </Link>{' '}
                !
              </Typography>
              <Typography paragraph color="inherit">
                <a href="/assets/2020/09/20200831_Plan_de_reprise_des_celebrations.pdf">
                  &rarr; Consulter le protocole sanitaire
                </a>
              </Typography>
            </>
          )}

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
