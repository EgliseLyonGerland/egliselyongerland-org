import React, { Component } from 'react';
import PropTypes from 'prop-types';
import findIndex from 'lodash/findIndex';
import { withStyles } from '@material-ui/core/styles';

import Text from 'components/Text/Text';

const styles = theme => ({
  tabs: {
    borderBottom: `${theme.picker.borderColor} solid 1px`,
  },
  tabsContent: {
    display: 'flex',
  },
  tab: {
    flexGrow: 1,
    textAlign: 'center',
    padding: [[10, 3, 7]],
    cursor: 'pointer',
    borderBottom: 'transparent solid 3px',

    '&:hover': {
      borderBottomColor: theme.picker.borderColor,
    },
  },
  tabDisabled: {
    opacity: 0.3,
    cursor: 'default',
  },
  tabActiveBar: {
    height: 3,
    background: 'red',
    transition: 'transform 0.3s ease-in-out',
    marginTop: -3,
  },
});

class TabPicker extends Component {
  handleChangeTab(tab) {
    const { onChange } = this.props;

    onChange(tab);
  }

  render() {
    const {
      tabs,
      bgColor,
      activeBarColor,
      renderLabel,
      current,
      classes,
    } = this.props;

    const tabWidth = 100 / tabs.length;
    const currentTabIndex = Math.max(0, findIndex(tabs, ['key', current]));

    const tabsStyles = {};

    if (bgColor) {
      tabsStyles.backgroundColor = bgColor;
    }

    return (
      <div className={classes.tabs}>
        <div className={classes.tabsContent} style={tabsStyles}>
          {tabs.map(tab => {
            const { key, active = true } = tab;

            return (
              <div
                key={key}
                className={`${classes.tab} ${
                  active ? '' : classes.tabDisabled
                }`}
                style={{ width: `${tabWidth}%` }}
                onClick={() => this.handleChangeTab(tab)}
              >
                {renderLabel(tab)}
              </div>
            );
          })}
        </div>

        <div
          className={classes.tabActiveBar}
          style={{
            width: `${tabWidth}%`,
            background: activeBarColor,
            transform: `translateX(${currentTabIndex * 100}%)`,
          }}
        />
      </div>
    );
  }
}

TabPicker.propTypes = {
  activeBarColor: PropTypes.string,
  bgColor: PropTypes.string,
  classes: PropTypes.shape().isRequired,
  current: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  onChange: PropTypes.func.isRequired,
  renderLabel: PropTypes.func,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      active: PropTypes.bool,
      key: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

TabPicker.defaultProps = {
  bgColor: null,
  activeBarColor: 'red',
  renderLabel: tab => (
    <Text ellipsis fontSize={0.9} fontWeight="regular" maxLines={1}>
      {tab.label}
    </Text>
  ),
};

export default withStyles(styles)(TabPicker);
