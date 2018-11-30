import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { rem } from 'polished';
import { NavLink } from 'react-router-dom';

import RevealQueue from 'components/Animation/RevealQueue';
import createResponsiveButton from 'utils/createResponsiveButton.hoc';
import routes from 'utils/routes';
import Sermon from './Sermon';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: [[96, 'auto']],
    maxWidth: 1280,
  },
  box: {
    width: '50%',
    flexShrink: 0,
    padding: 32,
  },
  content: {
    maxWidth: 320 + 24 + 40,
    position: 'relative',
    paddingLeft: 24 + 40,

    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      left: 0,
      width: 24,
      height: '100%',
      background: theme.palette.primary[500],
    },
  },
  h2: {
    display: 'block',
    fontSize: rem(38),
    lineHeight: 1.2,
    fontWeight: theme.typography.fontWeights.medium,
    marginBottom: 32,
  },
  excerpt: {
    display: 'block',
    fontSize: rem(20),
    fontWeight: theme.typography.fontWeights.regular,
    marginBottom: 32,
  },
  [theme.breakpoints.only('sm')]: {
    content: {
      paddingLeft: 16 + 24,

      '&:before': {
        width: 16,
      },
    },
    h2: {
      fontSize: rem(32),
      marginBottom: 24,
    },
  },
  [theme.breakpoints.down('xs')]: {
    root: {
      display: 'block',
      marginTop: 48,
    },
    box: {
      width: 'auto',
      maxWidth: 490,

      '&:first-child': {
        width: '100%',
      },

      '&:last-child': {
        display: 'none',
      },
    },
  },
  [theme.breakpoints.down('xxs')]: {
    box: {
      '&:first-child': {
        paddingLeft: 16,
      },
    },
    content: {
      paddingLeft: 16 + 24,

      '&:before': {
        width: 16,
      },
    },
    h2: {
      fontSize: rem(30),
      marginBottom: 24,
    },
  },
});

const ActionButton = createResponsiveButton(
  { xxs: 'md', md: 'lg' },
  'SermonsActionButton',
);

@withStyles(styles)
class Sermons extends Component {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        categories: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string.isRequired,
          }),
        ),
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      }),
    ).isRequired,
  };

  render() {
    const { classes, data } = this.props;

    return (
      <div className={classes.root} id="fuck">
        <div className={classes.box}>
          <div className={classes.content}>
            <RevealQueue>
              <h2 key="h2" className={classes.h2}>
                Ne ratez aucune
                <br />
                prédication.
              </h2>
              <p key="p" className={classes.excerpt}>
                Chaque prédication est enregistrée et peut être écoutée sur le
                site à tout moment, ou lue grâce à la transcription.
              </p>
              <div>
                <NavLink key="link" to={routes.blog({ category: 1 })}>
                  <ActionButton corners="circular">
                    Montrez-moi ça !
                  </ActionButton>
                </NavLink>
              </div>
            </RevealQueue>
          </div>
        </div>
        <RevealQueue delay={1}>
          {data.map(sermon => (
            <div key={sermon.id} className={classes.box}>
              <Sermon data={sermon} />
            </div>
          ))}
        </RevealQueue>
      </div>
    );
  }
}

export default Sermons;
