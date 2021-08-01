import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { rem } from 'polished';
import Container from 'components/Container/Container';

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
          <h2>ATTENTION : INFORMATION ÉTÉ 2021</h2>
          Du dimanche 11 juillet au dimanche 29 août inclus, le culte aura lieu
          dans la salle de conférences de l'hôtel NOVOTEL de Gerland, 70 avenue
          Leclerc, Lyon 7ème, à 10h. L'inscription préalable n'est plus
          obligatoire.
        </div>
      </Container>
    );
  }
}

export default Covid;
