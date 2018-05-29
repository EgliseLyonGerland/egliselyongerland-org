import React, { Component } from "react";
import PropTypes from "prop-types";
import { findIndex } from "lodash";
import { withStyles } from "@material-ui/core/styles";

import { Text } from "components";

const styles = theme => ({
  tabs: {
    borderBottom: `${theme.picker.borderColor} solid 1px`
  },
  tabsContent: {
    display: "flex"
  },
  tab: {
    flexGrow: 1,
    textAlign: "center",
    padding: [[10, 3, 7]],
    cursor: "pointer",
    borderBottom: "transparent solid 3px",

    "&:hover": {
      borderBottomColor: theme.picker.borderColor
    }
  },
  tabDisabled: {
    opacity: 0.3,
    cursor: "default"
  },
  tabActiveBar: {
    height: 3,
    background: "red",
    transition: "transform 0.3s ease-in-out",
    marginTop: -3
  }
});

class TabPicker extends Component {
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
    const {
      tabs,
      bgColor,
      activeBarColor,
      renderLabel,
      current,
      classes
    } = this.props;

    const tabWidth = 100 / tabs.length;
    const currentTabIndex = Math.max(0, findIndex(tabs, ["key", current]));

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
                  active ? "" : classes.tabDisabled
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
            transform: `translateX(${currentTabIndex * 100}%)`
          }}
        />
      </div>
    );
  }
}

export default withStyles(styles)(TabPicker);
