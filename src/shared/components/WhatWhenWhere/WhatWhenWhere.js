import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { Link } from 'react-router-dom';

import Image from 'components/Image/Image';
import Text from 'components/Text/Text';
import H2 from 'components/Text/H2';
import Hr from 'components/Hr/Hr';
import Button from 'components/Button/Button';
import routes from 'utils/routes';

import MapImage from './map.png';

const styles = {
  www: {
    background: '#eee',
    display: 'flex',
    alignItems: 'center',
  },
  right: {
    width: 450,
    padding: 30,
  },
  left: {
    flexGrow: 1,
  },
};

const WhatWhenWhere = ({ classes }) => (
  <div className={classes.www}>
    <div className={classes.right}>
      <H2>
        Culte ouvert à tous,
        <br /> le dimanche à 17h.
      </H2>
      <Text>302 avenue Jean Jaurès</Text>
      <Text>69007 Lyon</Text>
      <Hr lg />
      <Link to={routes.worship()}>
        <Button>En savoir plus</Button>
      </Link>
      <Hr inline />
      <Link to={routes.contact()}>
        <Button>Contact</Button>
      </Link>
    </div>
    <div className={classes.left}>
      <Image height={450} src={MapImage} />
    </div>
  </div>
);

WhatWhenWhere.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(WhatWhenWhere);
