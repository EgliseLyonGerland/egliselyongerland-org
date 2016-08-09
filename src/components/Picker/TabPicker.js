import React, { Component, PropTypes } from 'react';

import { Text } from 'components';

import { findIndex } from 'lodash';

import styles from './TabPicker.scss';

export default
class TabPicker extends Component {
  static propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      active: PropTypes.bool,
      current: PropTypes.bool,
    })).isRequired,
    bgColor: PropTypes.string,
    activeBarColor: PropTypes.string,
    renderLabel: PropTypes.func,
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    activeBarColor: 'red',
    renderLabel: ({ label }) => {
      return (<Text fontSize={0.9} fontWeight="medium" ellipsis maxLines={1}>{label}</Text>);
    },
  }

  indexOf(key) {
    return this.props.tabs.reduce((position, tab, index) => (tab.key === key ? index : position), 0);
  }

  handleChangeTab(tab) {
    this.props.onChange(tab);
  }

  render() {
    const {
      tabs,
      bgColor,
      activeBarColor,
      renderLabel } = this.props;

    const tabWidth = 100 / tabs.length;
    const currentTabIndex = findIndex(tabs, ['current', true]);

    const tabStyles = {
      width: `${tabWidth}%`,
    };

    if (bgColor) {
      tabStyles.backgroundColor = bgColor;
    }

    return (
      <div className={styles.tabs}>
        <div className={styles.tabsContent}>
          {tabs.map(tab => {
            const { key, active = true } = tab;

            return (
              <div
                key={key}
                className={`${styles.tab} ${active ? '' : styles.tabDisabled}`}
                style={tabStyles}
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
            transform: `translateX(${currentTabIndex * 100}%)`,
          }} />
      </div>
    );
  }
}
