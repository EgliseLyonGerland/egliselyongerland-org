import React, { PropTypes } from 'react';

import styles from './SearchButton.scss';

const SearchButton = ({ onClicked }) => (
  <div className={styles.button} onClick={() => onClicked()}>
    <span className="fa fa-search" />
  </div>
);

SearchButton.propTypes = {
  onClicked: PropTypes.func,
};

export default SearchButton;
