import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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
            <Typography
              variant="h5"
              color="inherit"
              style={{ whiteSpace: 'break-spaces' }}
            >
              {'⚠️ PASS SANITAIRE ET LIEU DE CULTE ⚠️'}
            </Typography>
            <Typography paragraph color="inherit">
              Conformément aux directives du gouvernement, le pass sanitaire
              n'est pas obligatoire pour pouvoir participer au culte.
            </Typography>
            <Typography paragraph color="inherit">
              À partir du <b>dimanche 11 juillet inclus</b>, la célébration du
              dimanche à 10h aura lieu dans la salle de conférence du NOVOTEL
              Lyon-Gerland (rez-de-chaussée), au{' '}
              <b>70 avenue Leclerc, Lyon 7ème</b>.
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
