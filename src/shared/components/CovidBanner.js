import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { rem } from 'polished';
import { NavLink as Link } from 'react-router-dom';
import Container from 'components/Container/Container';

const styles = theme => ({
  root: {
    background: '#E7BB41',
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
      color: '#4843bb',
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
          <h2>IMPORTANT : LIEU ET HORAIRE DU CULTE</h2>
          Actuellement, le culte a lieu chaque dimanche à 10h à la salle
          Saint-Irénée (37 rue Félix Brun, Lyon 7ème).
          <br />
          ATTENTION : une fois par mois, le culte est à 17h.
          <br />
          <Link to="/contact">
            <span style={{ fontSize: '1.5em' }}>&raquo;</span> Plus d'infos sur
            la page contact.
          </Link>
        </div>
      </Container>
    );
  }
}

export default Covid;
