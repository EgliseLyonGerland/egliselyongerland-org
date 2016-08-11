import React, { PropTypes } from 'react';

import styles from './Image.scss';

const Image = ({ src, title = '', seoFriendly }) => (
  <div className={styles.image} style={{ backgroundImage: `url(${src})` }}>
    {seoFriendly && (<img className={styles.img} src={src} alt={title} />)}
  </div>
);

Image.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string,
  seoFriendly: PropTypes.bool,
};

Image.defaultProps = {
  seoFriendly: true,
};

export default Image;
