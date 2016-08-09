import React, { Component, PropTypes } from 'react';

import { fill } from 'lodash';

import styles from './GridPicker.scss';

export default
class GridPicker extends Component {
  static propTypes = {
    items: PropTypes.arrayOf({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired,
    onChange: PropTypes.func,
  }

  render() {
    const { items = [], onChange = () => {} } = this.props;

    return (
      <div className={styles.grid}>
        {items.map((item) =>
          <div key={item.key} className={styles.cell} onClick={() => onChange(item.key)}>{item.label}</div>
        )}

        {fill(new Array(20), 0).map((value, index) =>
          <div key={index} className={styles.cellGhost} />
        )}
      </div>
    );
  }
}
