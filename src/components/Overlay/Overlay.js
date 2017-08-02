import React from 'react';
import PropTypes from 'prop-types';

import styles from './Overlay.scss';

const Overlay = ({ active, onClicked }) => (
  <div
    className={`${styles.overlay} ${active ? styles.active : ''}`}
    onClick={() => onClicked()}
  />
);

Overlay.propTypes = {
  active: PropTypes.bool,
  onClicked: PropTypes.func,
};

Overlay.defaultProps = {
  active: false,
  onClicked: () => {},
};

export default Overlay;
