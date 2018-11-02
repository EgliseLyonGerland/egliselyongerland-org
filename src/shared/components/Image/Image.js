import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import LazyLoad from 'react-lazyload';
import isNumber from 'lodash/isNumber';

import placeholderPicture from 'images/placeholder.jpg';
import theme from 'config/theme';

const pixel =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

const styles = {
  root: {},
  circular: {
    borderRadius: '100%',
  },
  withRatio: {
    position: 'relative',
    overflow: 'hidden',

    '&:before': {
      content: '""',
      display: 'block',
    },

    '& $img': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  },
  ratio11: {
    '&:before': {
      paddingBottom: '100%',
    },
  },
  ratio43: {
    '&:before': {
      paddingBottom: '75%',
    },
  },
  ratio169: {
    '&:before': {
      paddingBottom: '52.25%',
    },
  },
  img: {
    width: '100%',
  },
};

const Image = ({
  src = placeholderPicture,
  srcset,
  title = '',
  ratio,
  height,
  classes,
  className,
  circular,
  lazyload,
  lazyloadBackground,
}) => {
  const style = {};
  let withRatio = false;
  let ratioClassName = null;

  if (height) {
    withRatio = true;
    style.height = isNumber(height) ? `${height}px` : `${height}`;
  } else if (circular) {
    withRatio = true;
    ratioClassName = 'ratio11';
  } else if (ratio) {
    withRatio = true;
    ratioClassName = `ratio${ratio.replace('/', '')}`;
  }

  if (lazyload && lazyloadBackground) {
    style.backgroundColor = lazyloadBackground;
  }

  const img = (
    <img
      alt={title}
      className={classes.img}
      src={src}
      srcSet={srcset}
      style={style}
    />
  );

  return (
    <div
      className={classnames(
        classes.root,
        {
          [classes.withRatio]: withRatio,
          [classes[ratioClassName]]: withRatio,
          [classes.circular]: circular,
        },
        className,
      )}
      style={style}
    >
      {lazyload ? (
        <LazyLoad height="100%" offset={100}>
          {img}
        </LazyLoad>
      ) : (
        img
      )}
    </div>
  );
};

Image.propTypes = {
  circular: PropTypes.bool,
  classes: PropTypes.shape().isRequired,
  className: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  lazyload: PropTypes.bool,
  lazyloadBackground: PropTypes.string,
  ratio: PropTypes.oneOf(['16/9', '4/3', '1/1']),
  src: PropTypes.string,
  srcset: PropTypes.string,
  title: PropTypes.string,
};

Image.defaultProps = {
  src: pixel,
  srcset: null,
  title: null,
  height: null,
  ratio: null,
  className: null,
  circular: false,
  lazyload: true,
  lazyloadBackground: theme.palette.primary[100],
};

export default withStyles(styles)(Image);
