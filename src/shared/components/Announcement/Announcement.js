import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { noop } from 'lodash';
import Typography from 'components/Typography/Typography';
import Container from 'components/Container/Container';
import Button from 'components/Button/Button';
import RevealQueue from 'components/Animation/RevealQueue';

const styles = theme => ({
  root: {
    background: 'white',
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
  },
  inner: {
    margin: 'auto',
    padding: [[24, 0]],
  },
  addressWrapper: {
    position: 'relative',
    paddingLeft: 32,

    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      width: 4,
      height: '100%',
      left: 0,
      top: 0,
      background: theme.palette.primary[500],
    },
  },
  buttonWrapper: {
    display: 'flex',
    marginTop: 64,
  },
});

const Announcement = ({ classes, onCloseButtonClicked }) => (
  <div className={classes.root}>
    <div className={classes.inner}>
      <Container xs>
        <RevealQueue delay={0.2}>
          <Typography color="primary" variant="h5">
            Changement important !
          </Typography>
          <Typography bold component="div" paragraph>
            <Typography bold gutterBottom>
              Le culte du{' '}
              <Typography bold color="primary" component="span" inline>
                dimanche 28 avril
              </Typography>{' '}
              aura lieu exceptionnellement à 10h, dans la salle de conférence de
              l’hôtel Novotel de Gerland.
            </Typography>
            <Typography>
              À noter : il n’y aura pas de culte l’après- midi, à 17h, à
              l’adresse habituelle !
            </Typography>
          </Typography>
          <div className={classes.addressWrapper}>
            <Typography bold gutterBottom>
              Adresse :
            </Typography>
            <Typography gutterBottom>
              70 avenue Leclerc <br />
              Lyon 7ème
            </Typography>
            <Typography paragraph />
            <Typography bold gutterBottom>
              Accès :
            </Typography>
            <Typography component="ul" gutterBottom>
              <li>Tram T1 arrêt Halle Tony Garnier.</li>
              <li>Bus C22 arrêt Halle Tony Garnier.</li>
              <li>Bus C7 arrêt Halle Tony Garnier.</li>
              <li>Bus 60 arrêt Leclerc Girard.</li>
              <li>En voiture, se garer au parking de l’hôtel.</li>
            </Typography>
          </div>
          <div className={classes.buttonWrapper}>
            <Button onClick={() => onCloseButtonClicked()}>
              J'ai compris !
            </Button>
          </div>
        </RevealQueue>
      </Container>
    </div>
  </div>
);

Announcement.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  onCloseButtonClicked: PropTypes.func,
};

Announcement.defaultProps = {
  onCloseButtonClicked: noop,
};

export default withStyles(styles)(Announcement);
