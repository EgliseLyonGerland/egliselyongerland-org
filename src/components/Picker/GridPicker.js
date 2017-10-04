import React, { Component } from "react";
import PropTypes from "prop-types";

import { fill } from "lodash";
import classes from "classnames";

import styles from "./GridPicker.scss";

class GridPicker extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.any.isRequired,
        label: PropTypes.string.isRequired
      })
    ).isRequired,
    current: PropTypes.any,
    readOnly: PropTypes.bool,
    onChange: PropTypes.func
  };

  render() {
    const {
      items = [],
      current,
      readOnly = false,
      onChange = () => {}
    } = this.props;

    return (
      <div className={classes(styles.grid, { [styles.readOnly]: readOnly })}>
        {items.map(item => (
          <div
            key={item.key}
            className={classes(styles.cell, {
              [styles.active]: current === item.key
            })}
            onClick={() =>
              !readOnly &&
              onChange(current === item.key ? undefined : item.key)}
          >
            <span className={styles.label}>{item.label}</span>
          </div>
        ))}

        {fill(new Array(20), 0).map((value, index) => (
          <div key={index} className={styles.cellGhost} />
        ))}
      </div>
    );
  }
}

export default GridPicker;
