import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { noop } from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';

import Container from 'components/Container/Container';
import Button from 'components/Button/Button';
import Typography from 'components/Typography/Typography';

const styles = {
  root: {
    background: '#FFFFFF',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 100,
    overflowY: 'auto',
    padding: [[48, 0]],
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
};

const Announcement = ({ classes, onCloseButtonClicked }) => {
  const [remind, setRemind] = useState(true);

  return (
    <div className={classes.root}>
      <Container sm>
        <Typography variant="h5">Bonne nouvelle !</Typography>

        <Typography paragraph>
          Nous pouvons vous accueillir de nouveau pour la célébration du
          dimanche, à 10h, au Théâtre de Lulu sur la Colline,{' '}
          <b>à partir du dimanche 7 juin</b>.
        </Typography>
        <Typography paragraph>
          Cette possibilité s'accompagne toutefois d'un protocole sanitaire
          précis, qui suit les directives officielles.
        </Typography>
        <Typography paragraph>
          À noter en particulier : <b>le port obligatoire du masque</b> pour les
          plus de 11 ans dans l'enceinte du bâtiment, et{' '}
          <b>la limitation du nombre de fidèles présents</b> en fonction de la
          surface des lieux.
        </Typography>
        <Typography paragraph>
          Pour toute question, n'hésitez pas à{' '}
          <Link to="/contact" onClick={() => onCloseButtonClicked(remind)}>
            nous contacter
          </Link>{' '}
          !
        </Typography>
        <Typography paragraph>
          <a href="/assets/2020/06/plan_de_reprise_des_celebrations.pdf">
            &rarr; Consulter le protocole sanitaire
          </a>
          <br />
          <Link to="/contact" onClick={() => onCloseButtonClicked(remind)}>
            &rarr; S'inscrire pour assister au prochain culte
          </Link>
        </Typography>

        <div className={classes.confirm}>
          <Button onClick={() => onCloseButtonClicked(remind)}>
            J'AI COMPRIS
          </Button>
          <div className={classes.checkbox}>
            <Checkbox
              checked={remind}
              onChange={event => setRemind(event.target.checked)}
            />
            Mais rapellez-le moi quand même lors de ma prochaine visite
          </div>
        </div>
      </Container>
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
