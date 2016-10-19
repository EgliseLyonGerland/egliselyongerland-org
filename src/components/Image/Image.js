import React, { PropTypes } from 'react';

import styles from './Image.scss';

const Image = (props) => {
  const {
    src,
    title = '',
    ratio,
    height,
    seoFriendly
  } = props;

  const style = { backgroundImage: `url(${src})` };

  if (height) {
    style.height = `${height}px`;
  } else {
    style.paddingBottom = `${100 * ratio}%`;
  }

  return (
    <div className={styles.image} style={style}>
      {seoFriendly && (<img className={styles.img} src={src} alt={title} />)}
    </div>
  );
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string,
  ratio: PropTypes.number,
  height: PropTypes.number,
  seoFriendly: PropTypes.bool,
};

Image.defaultProps = {
  seoFriendly: true,
  ratio: (16 / 9),
};

export default Image;
