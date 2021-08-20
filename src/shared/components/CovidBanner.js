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
          <h2>
            IMPORTANT : CHANGEMENT DE{' '}
            <span style={{ color: '#4843bb' }}>LIEU DE CULTE</span>
          </h2>
          Les conditions sanitaires et la règlementation actuelle entraînent ces
          jours-ci un changement fréquent de lieu de culte pour notre église.
          <br />
          <span style={{ color: '#4843bb' }}>
            <span style={{ fontSize: '1.5em' }}>&raquo;</span> Plus d'infos sur
            la{' '}
            <Link
              to="/contact"
              style={{
                color: 'inherit',
                borderColor: 'inherit',
                textDecoration: 'underline',
              }}
            >
              page contact
            </Link>
            .
          </span>
        </div>
      </Container>
    );
  }
}

export default Covid;
