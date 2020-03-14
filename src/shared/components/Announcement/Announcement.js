import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';

import Container from 'components/Container/Container';
import Button from 'components/Button/Button';
import Typography from 'components/Typography/Typography';

import pasDeCulteImage from './images/pasdeculte.png';

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
        <img
          alt="PAS DE CULTE"
          className={classes.image}
          src={pasDeCulteImage}
        />

        <Typography variant="h5">Attention !</Typography>

        <Typography paragraph>
          Info #CORONAVIRUS. Dans un souci de protection des plus vulnérables et
          de coopération avec les autorités, nous annonçons{' '}
          <b>
            la suspension des célébrations de notre église à partir du dimanche
            15 mars
          </b>{' '}
          inclus et jusqu'à nouvel ordre. L’assemblée générale annuelle
          initialement prévue le 15 mars est également reportée. Merci de votre
          compréhension.
        </Typography>
        <Typography paragraph>
          Un culte délocalisé sera diffusé en live sur ce lien :<br />
          <a
            href="https://youtu.be/bEmxuzcCrb0"
            rel="noopener noreferrer"
            target="_blank"
          >
            https://youtu.be/bEmxuzcCrb0
          </a>
          <br />
          <br />
          <em>
            Nous comptons sur votre compréhension en cas de difficultés
            techniques, car c’est la première fois que nous expérimentons ce
            procédé. En espérant que cette situation inédite ne perdure pas !
          </em>
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
