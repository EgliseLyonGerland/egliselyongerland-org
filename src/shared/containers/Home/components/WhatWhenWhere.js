import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { rem, rgba } from 'polished';
import Plx from 'react-plx';

import Image from 'components/Image/Image';
import Hr from 'components/Hr/Hr';
import RevealQueue from 'components/Animation/RevealQueue';
import routes from 'utils/routes';
import createResponsiveButton from 'utils/createResponsiveButton.hoc';

import mapImage from '../images/map.png';

const mapFloodSize = 128;

const styles = theme => ({
  root: {
    background: '#fafafa',
    display: 'flex',
    justifyContent: 'center',
    zIndex: 5,
    position: 'relative',
    minHeight: '30vw',
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
    height: `calc(100% + ${mapFloodSize}px)`,

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
    fontWeight: 'normal',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    transition: 'opacity 0.3s',
  },
  h2: {
    fontSize: rem(38),
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
  address: {
    fontSize: rem(20),
    fontWeight: theme.typography.fontWeights.regular,
    lineHeight: 1.2,
  },
  button: {
    display: 'inline-block',
    marginRight: 16,
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

const mapParallaxData = [
  {
    start: '0',
    duration: '150vh',
    properties: [
      {
        startValue: 0,
        endValue: -mapFloodSize,
        unit: 'px',
        property: 'translateY',
      },
    ],
  },
];

const ActionButton = createResponsiveButton(
  { xxs: 'xs', xs: 'sm', md: 'md' },
  'WhatWhenWhereActionButton',
);
const MapButton = createResponsiveButton(
  { xxs: 'xl' },
  'WhatWhenWhereMapButton',
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
                <div>le dimanche à 17h.</div>
              </RevealQueue>
            </h2>
            <RevealQueue>
              <div className={classes.address}>302 avenue Jean Jaurès</div>
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
            <Plx className={classes.map} parallaxData={mapParallaxData}>
              <Image height="100%" src={mapImage} />
              <div
                className={classes.mapLink}
                href="https://goo.gl/maps/KqaN3u1ciiR2"
                target="_blank"
              >
                <MapButton color="primary" corners="circular">
                  Voir le plan
                </MapButton>
              </div>
            </Plx>
          </div>
        </RevealQueue>
      </div>
    );
  }
}

export default WhatWhenWhere;
