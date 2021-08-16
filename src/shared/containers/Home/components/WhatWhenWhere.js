import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { rem, rgba } from 'polished';
import { Parallax } from 'react-scroll-parallax';

import Image from 'components/Image/Image';
import Hr from 'components/Hr/Hr';
import RevealQueue from 'components/Animation/RevealQueue';
import routes from 'utils/routes';
import createResponsiveButton from 'utils/createResponsiveButton.hoc';

import mapImage from '../images/map.png';

const mapFloodSize = 128;

const styles = theme => ({
  root: {
    background: '#f5f5f5',
    display: 'flex',
    justifyContent: 'center',
    zIndex: 5,
    position: 'relative',
    height: '50vw',
    maxHeight: 550,
  },
  left: {
    width: '40vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  right: {
    flexGrow: 1,
    maxWidth: 1024,
  },
  content: {
    zIndex: 1,
    padding: [[64, 0]],
  },
  map: {
    width: '100%',
    height: '100%',
    // height: `calc(100% + ${mapFloodSize}px)`,

    '&:hover': {
      '& $mapLink': {
        opacity: 1,
      },
    },
  },
  mapLink: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: rgba('white', 0.3),
    fontSize: 32,
    fontWeight: theme.typography.fontWeights.regular,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    transition: 'opacity 0.3s',
  },
  h2: {
    fontSize: rem(32),
    fontWeight: theme.typography.fontWeights.medium,
    lineHeight: 1.2,

    '&:after': {
      content: '""',
      display: 'block',
      margin: [[40, 0, 24]],
      background: theme.palette.primary[500],
      height: 1,
      width: '20%',
    },
  },
  // coffee: {
  //   fontSize: rem(16),
  //   fontWeight: theme.typography.fontWeights.bold,
  //   border: 'solid 1px #777',
  //   color: '#777',
  //   padding: [[8, 16]],
  //   marginTop: 24,
  //   display: 'inline-block',
  //   borderRadius: 4,

  //   '&:before': {
  //     content: '"☕"',
  //     display: 'inline-block',
  //     marginRight: 8,
  //   },
  // },
  address: {
    fontSize: rem(20),
    fontWeight: theme.typography.fontWeights.regular,
    lineHeight: 1.2,
  },
  button: {
    display: 'inline-block',
    marginRight: 16,
  },
  [theme.breakpoints.down('lg')]: {
    root: {
      height: 'auto',
    },
  },
  [theme.breakpoints.between('sm', 'md')]: {
    h2: {
      fontSize: rem(28),
    },
  },
  [theme.breakpoints.down('xs')]: {
    root: {
      display: 'block',
      height: 'auto',
      maxHeight: 'inherit',
    },
    left: {
      display: 'block',
      width: 'auto',
      marginBottom: mapFloodSize,
    },
    right: {
      width: 'auto',
      height: '50vw',
      margin: [[0, 24, 0]],
    },
    content: {
      padding: [[64, 0, 0, 48]],
    },
    h2: {
      fontSize: rem(30),
    },
  },
  [theme.breakpoints.down('xxs')]: {
    root: {
      marginBottom: mapFloodSize / 2,
    },
    right: {
      margin: 0,
    },
    content: {
      padding: [[56, 0, 0, 40]],
    },
    h2: {
      fontSize: rem(26),
    },
  },
});

const ActionButton = createResponsiveButton(
  { xxs: 'xs', xs: 'sm', md: 'md' },
  'WhatWhenWhereActionButton',
);

@withStyles(styles)
class WhatWhenWhere extends Component {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.left}>
          <div className={classes.content}>
            <h2 className={classes.h2}>
              <RevealQueue>
                <div>Culte ouvert à tous,</div>
                <div>le dimanche à 10h.</div>
                {/* <div className={classes.coffee}>Café à 9h30</div> */}
              </RevealQueue>
            </h2>
            <RevealQueue>
              <div
                className={classes.address}
                style={{
                  color: '#F0544F',
                  fontSize: '1em',
                  fontWeight: 'bold',
                }}
              >
                Dimanche 22 août :
              </div>
              <Hr xs />
              <div className={classes.address}>
                <b>Théâtre de Lulu sur la Colline</b>
              </div>
              <div className={classes.address}>60 avenue Victor Lagrange</div>
              <div className={classes.address}>69007 Lyon</div>
              <Hr xl />
              <Link className={classes.button} to={routes.worship()}>
                <ActionButton color="primary">En savoir plus</ActionButton>
              </Link>
              <Link className={classes.button} to={routes.contact()}>
                <ActionButton color="primary">Contact</ActionButton>
              </Link>
            </RevealQueue>
          </div>
        </div>
        <RevealQueue>
          <div className={classes.right}>
            <Parallax
              className={classes.map}
              offsetYMax={0}
              offsetYMin={0}
              styleInner={{ height: '100%' }}
            >
              <Image height="100%" src={mapImage} />

              <span
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: 280,
                  height: 120,
                  marginTop: -60,
                  marginLeft: -140,
                  padding: 10,
                  border: 'solid 10px #F0544F',
                  color: '#F0544F',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  lineHeight: 1.2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  background: 'rgba(255, 255, 255, 0.7)',
                  transform: 'rotate(-10deg)',
                }}
              >
                ATTENTION : actuellement, changement fréquent de lieu de culte.
                Pensez à nous contacter !
              </span>
            </Parallax>
          </div>
        </RevealQueue>
      </div>
    );
  }
}

export default WhatWhenWhere;
