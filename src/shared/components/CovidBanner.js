import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink as Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { rem } from 'polished';
import Container from 'components/Container/Container';
import routes from 'utils/routes';

const styles = theme => ({
  root: {
    background: theme.palette.secondary[500],
    fontSize: rem(22),
    fontWeight: theme.typography.fontWeights.regular,
    lineHeight: 1.5,
    color: 'white',
    padding: [[32, 0]],
  },
  inner: {
    '& > h2': {
      fontWeight: theme.typography.fontWeights.bold,
      fontSize: rem(24),
      textTransform: 'uppercase',
      display: 'block',
      marginBottom: 8,
    },

    '& > a': {
      fontWeight: theme.typography.fontWeights.medium,
      position: 'relative',
      display: 'inline-block',
      color: 'white',

      '&:after': {
        content: '""',
        position: 'absolute',
        width: '100%',
        height: 1,
        left: 0,
        bottom: -2,
        background: 'white',
      },
    },
  },
});

@withStyles(styles)
class Covid extends Component {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
  };

  render() {
    const { classes } = this.props;

    return (
      <Container className={classes.root} lg>
        <div className={classes.inner}>
          <h2>INFORMATION CORONAVIRUS</h2>
          La capacité d'accueil du public dans notre lieu de culte étant
          actuellement limitée, l'inscription préalable par e-mail ou par SMS
          (voir <Link to={routes.contact()}>page contact</Link>) est obligatoire
          pour pouvoir assister à la célébration. Chaque dimanche à 10h, la
          célébration est également diffusée en direct ici :{' '}
          <a
            href="https://links.egliselyongerland.org/link/live"
            target="_blank"
            rel="noopener noreferrer"
          >
            links.egliselyongerland.org/link/live
          </a>
        </div>
      </Container>
    );
  }
}

export default Covid;
