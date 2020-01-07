import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
        <Typography variant="h5">Attention !</Typography>

        <Typography paragraph>
          Exceptionnellement, ce <b>dimanche 19 janvier</b>, il n’y aura PAS DE
          CULTE au Théâtre Lulu sur la Colline, car notre église se joint aux
          autres églises protestantes évangéliques de la région lyonnaise pour
          un culte en commun, à l’occasion de la semaine universelle de prière.
        </Typography>

        <Typography paragraph>
          Comme chaque année, cet événement aura lieu à la{' '}
          <b>Bourse du Travail</b> : 205 Place Guichard, Lyon 3ème (Métro B
          arrêt Place Guichard), à 10h (ouverture des portes à 9h30). Le culte
          est ouvert à tous !
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
