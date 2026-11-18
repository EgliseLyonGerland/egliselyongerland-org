import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { NavLink as Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import christmasBackgroundImage from './images/christmas-background.png';
import christmasTitleImage from './images/christmas-title.svg';
import whenWhereImage from './images/when-where.svg';

const styles = ({ breakpoints }) => ({
  root: {
    height: 64 + 16,
    display: 'flex',
    alignItems: 'flex-end',
    padding: [[0, 16]],
    transition: 'height 0.3s',
  },
  inner: {
    background: `url(${christmasBackgroundImage}) no-repeat center center`,
    backgroundSize: 'cover',
    color: '#DCE1E1',
    height: 64,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '24px',
    width: '100%',
    borderRadius: 8,
    transition: 'height 0.3s, box-shadow 0.3s',
    outline: '1px solid #FFCB7D',
    position: 'relative',

    '&:hover, &:focus-within': {
      boxShadow: '0 0 10px #FFCB7D',
    },
  },
  cta: {
    position: 'absolute',
    inset: '0 0',
  },
  title: {
    fill: '#DCE1E1',
    height: 64,
    transition: 'height 0.3s',
  },
  whenWhere: {
    height: 38,
    transition: 'height 0.3s',
  },
  sticky: {
    height: 64,
    padding: 0,

    '& $inner': {
      height: 64,
      borderRadius: 0,
    },
    '& $title': {
      fill: '#DCE1E1',
      height: 52,
    },
    '& $whenWhere': {
      height: 30,
    },
  },

  [breakpoints.down('sm')]: {
    whenWhere: {
      display: 'none',
    },
  },
  [breakpoints.down('xs')]: {
    title: {
      height: 48,
    },
  },
  [breakpoints.down('xxs')]: {
    root: {
      height: 64,
      padding: 0,
    },
    inner: {
      height: 64,
      gap: '16px',
      borderRadius: 0,
    },
    title: {
      fill: '#DCE1E1',
      height: '52px !important',
    },
  },
});

function Christmas({ classes, sticky }) {
  return (
    <div className={classnames(classes.root, sticky && classes.sticky)}>
      <div className={classes.inner}>
        <img
          src={christmasTitleImage}
          className={classes.title}
          alt="Célébration protestante de Noël"
        />
        <img
          src={whenWhereImage}
          className={classes.whenWhere}
          alt="Célébration protestante de Noël"
        />

        <Link
          to="/noel"
          className={classes.cta}
          alt="En savoir plus sur Noël"
        />
      </div>
    </div>
  );
}

Christmas.propTypes = {
  classes: PropTypes.shape().isRequired,
  sticky: PropTypes.bool.isRequired,
};

export default withStyles(styles)(Christmas);
