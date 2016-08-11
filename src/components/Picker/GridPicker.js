import React, { PropTypes } from 'react';

import { fill } from 'lodash';

import styles from './GridPicker.scss';

const GridPicker = ({ items = [], onChange = () => {} }) => (
  <div className={styles.grid}>
    {items.map((item) =>
      <div
        key={item.key}
        className={styles.cell}
        onClick={() => onChange(item.key)}
      >
        {item.label}
      </div>
    )}

    {fill(new Array(20), 0).map((value, index) =>
      <div key={index} className={styles.cellGhost} />
    )}
  </div>
);

GridPicker.propTypes = {
  items: PropTypes.arrayOf(React.PropTypes.shape({
    key: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  onChange: PropTypes.func,
};

export default GridPicker;
