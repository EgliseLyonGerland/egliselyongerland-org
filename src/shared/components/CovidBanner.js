import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { rem } from 'polished';
import Container from 'components/Container/Container';

const styles = theme => ({
  root: {
    background: '#F0544F',
    fontSize: rem(22),
    fontWeight: theme.typography.fontWeights.regular,
    lineHeight: 1.5,
    color: 'white',
    padding: [[32, 0]],
  },
  inner: {
    '& > h2': {
      fontWeight: theme.typography.fontWeights.bold,
      fontSize: rem(28),
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
          <h2>IMPORTANT : LISEZ BIEN CE MESSAGE</h2>
          La paroissage rencontre actuellement des difficultés pour trouver un
          lieu où se rassembler. C'est pourquoi bla bla bla... Labore sunt aute
          incididunt nisi ad ut non exercitation id Lorem sint consectetur.
          Proident magna duis id ex ex aliquip occaecat proident eiusmod duis
          mollit commodo. Nostrud elit incididunt aliquip id ipsum occaecat.
          Occaecat proident non non labore eu laboris sunt irure nisi
          reprehenderit ut incididunt adipisicing dolor. Aliqua eiusmod aliqua
          sit aliqua ex est ullamco.
        </div>
      </Container>
    );
  }
}

export default Covid;
