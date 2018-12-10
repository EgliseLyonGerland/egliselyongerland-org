import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

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
  className,
}) => {
  const style = { backgroundImage: `url(${src})` };

  if (height) {
    style.height = `${height}px`;
  } else {
    style.paddingBottom = `${100 * ratio}%`;
  }

  return (
    <div className={classnames(classes.image, className)} style={style}>
      {seoFriendly && <img alt={title} className={classes.img} src={src} />}
    </div>
  );
};

Image.propTypes = {
  classes: PropTypes.shape().isRequired,
  className: PropTypes.string,
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
  className: null,
};

export default withStyles(styles)(Image);
