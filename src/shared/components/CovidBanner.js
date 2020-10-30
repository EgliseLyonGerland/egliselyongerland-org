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
      <Container className={classes.root} md>
        <div className={classes.inner}>
          <h2>
            <span role="img" aria-label="Attention">
              ⚠️
            </span>{' '}
            INFORMATION CORONAVIRUS{' '}
            <span role="img" aria-label="Attention">
              ⚠️
            </span>
          </h2>
          En raison de la situation sanitaire, la célébration du dimanche est
          actuellement suspendue et remplacée par un culte en direct sur
          internet, chaque dimanche à 10h, accessible par le lien suivant :{' '}
          <a
            href="https://links.egliselyongerland.org/link/live"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://links.egliselyongerland.org/link/live
          </a>
        </div>
      </Container>
    );
  }
}

export default Covid;
