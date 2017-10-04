import React, { Component } from "react";
import PropTypes from "prop-types";

import { Text } from "components";

import { findIndex } from "lodash";

import styles from "./TabPicker.scss";

export default class TabPicker extends Component {
  static propTypes = {
    tabs: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.any.isRequired,
        label: PropTypes.string.isRequired,
        active: PropTypes.bool
      })
    ).isRequired,
    current: PropTypes.any,
    bgColor: PropTypes.string,
    activeBarColor: PropTypes.string,
    renderLabel: PropTypes.func,
    onChange: PropTypes.func.isRequired
  };

  static defaultProps = {
    activeBarColor: "red",
    renderLabel: ({ label }) => (
      <Text fontSize={0.9} fontWeight="medium" ellipsis maxLines={1}>
        {label}
      </Text>
    )
  };

  handleChangeTab(tab) {
    this.props.onChange(tab);
  }

  render() {
    const { tabs, bgColor, activeBarColor, renderLabel, current } = this.props;

    const tabWidth = 100 / tabs.length;
    const currentTabIndex = Math.max(0, findIndex(tabs, ["key", current]));

    const tabsStyles = {};

    if (bgColor) {
      tabsStyles.backgroundColor = bgColor;
    }

    return (
      <div className={styles.tabs}>
        <div className={styles.tabsContent} style={tabsStyles}>
          {tabs.map(tab => {
            const { key, active = true } = tab;

            return (
              <div
                key={key}
                className={`${styles.tab} ${active ? "" : styles.tabDisabled}`}
                style={{ width: `${tabWidth}%` }}
                onClick={() => this.handleChangeTab(tab)}
              >
                {renderLabel(tab)}
              </div>
            );
          })}
        </div>

        <div
          className={styles.tabActiveBar}
          style={{
            width: `${tabWidth}%`,
            background: activeBarColor,
            transform: `translateX(${currentTabIndex * 100}%)`
          }}
        />
      </div>
    );
  }
}
