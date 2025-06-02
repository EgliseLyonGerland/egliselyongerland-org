import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { withStyles } from '@material-ui/core/styles';

import Jumbotron from 'components/Jumbotron/Jumbotron';

import jumbotronImage from './images/jumbotron.jpg';

const styles = {
  foobar: {
    display: 'block',
    '&:before': { content: "''" },
  },
  iframe: {
    width: '100%',
    border: 'none',
    height: 1500,
  },
  '@media screen and (max-width: 992px)': {
    iframe: {
      height: 2200,
    },
  },
  '@media screen and (max-width: 768px)': {
    iframe: {
      height: 2000,
    },
  },
  '@media screen and (max-width: 576px)': {
    iframe: {
      height: 2100,
    },
  },
  '@media screen and (max-width: 320px)': {
    iframe: {
      height: 2400,
    },
  },
};

const title = 'Faire un don';

const Donate = ({ classes }) => (
  <div>
    <Helmet>
      <title>{title}</title>
    </Helmet>

    <Jumbotron background={jumbotronImage} title={title} />

    <div className={classes.foobar} />

    <iframe
      allowTransparency
      className={classes.iframe}
      scrolling="auto"
      src="https://www.helloasso.com/associations/eglise-reformee-evangelique-de-lyon/formulaires/1/widget"
      title="Formulaire HelloAsso"
    />
  </div>
);

Donate.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(Donate);
