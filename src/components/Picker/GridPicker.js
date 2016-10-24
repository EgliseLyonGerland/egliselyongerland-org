import React, { PropTypes, Component } from 'react';

import { fill } from 'lodash';
import classes from 'classnames';

import styles from './GridPicker.scss';

class GridPicker extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(React.PropTypes.shape({
      key: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired,
    })).isRequired,
    current: PropTypes.any,
    onChange: PropTypes.func,
  }

  render() {
    const {
      items = [],
      current,
      onChange = () => {}
    } = this.props;

    return (
      <div className={styles.grid}>
        {items.map((item) =>
          <div
            key={item.key}
            className={classes(
              styles.cell,
              { [styles.active]: current === item.key }
            )}
            onClick={() => onChange(current === item.key ? null : item.key)}
          >
            <span className={styles.label}>{item.label}</span>
          </div>
        )}

        {fill(new Array(20), 0).map((value, index) =>
          <div key={index} className={styles.cellGhost} />
        )}
      </div>
    );
  }
}

export default GridPicker;