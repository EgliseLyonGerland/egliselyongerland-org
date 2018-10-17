import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import placeholderPicture from 'images/placeholder.jpg';

const styles = {
  image: {
    background: 'no-repeat center center',
    backgroundSize: 'cover',
    height: 0,
    lineHeight: 0,
  },
  img: {
    width: 0,
    height: 0,
    visibility: 'hidden',
  },
};

const Image = ({
  src = placeholderPicture,
  title = '',
  ratio,
  height,
  seoFriendly,
  classes,
}) => {
  const style = { backgroundImage: `url(${src})` };

  if (height) {
    style.height = `${height}px`;
  } else {
    style.paddingBottom = `${100 * ratio}%`;
  }

  return (
    <div className={classes.image} style={style}>
      {seoFriendly && <img alt={title} className={classes.img} src={src} />}
    </div>
  );
};

Image.propTypes = {
  classes: PropTypes.shape().isRequired,
  height: PropTypes.number,
  ratio: PropTypes.number,
  seoFriendly: PropTypes.bool,
  src: PropTypes.string,
  title: PropTypes.string,
};

Image.defaultProps = {
  src: null,
  title: null,
  height: null,
  seoFriendly: true,
  ratio: 9 / 16,
};

export default withStyles(styles)(Image);
