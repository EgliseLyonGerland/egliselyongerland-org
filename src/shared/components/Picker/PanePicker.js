import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Motion, spring } from "react-motion";
import { findIndex } from "lodash";

import { TabPicker } from "components";

const styles = theme => ({
  root: {
    width: "100%",
    whiteSpace: "nowrap",
    overflowX: "hidden"
  },

  pane: {
    width: "100%",
    whiteSpace: "normal",
    display: "inline-block",
    verticalAlign: "top"
  }
});

class PanePicker extends Component {
  static propTypes = {
    panes: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.any.isRequired,
        label: PropTypes.string.isRequired,
        children: PropTypes.any,
        active: PropTypes.bool
      })
    ).isRequired,
    current: PropTypes.any,
    onChange: PropTypes.func,
    tabBgColor: PropTypes.string,
    tabActiveBarColor: PropTypes.string,
    height: PropTypes.number
  };

  render() {
    const {
      panes,
      current,
      height,
      tabBgColor,
      tabActiveBarColor,
      classes,
      onChange = () => {}
    } = this.props;

    const currentPaneIndex = Math.max(0, findIndex(panes, ["key", current]));

    let paneStyles = {};

    if (height) {
      paneStyles = {
        height: `${height}px`,
        overflowY: "auto"
      };
    }

    return (
      <div>
        <TabPicker
          tabs={panes}
          current={current}
          bgColor={tabBgColor}
          activeBarColor={tabActiveBarColor}
          onChange={tab => tab.active !== false && onChange(tab)}
        />

        <div className={classes.root}>
          <Motion
            defaultStyle={{ x: 0 }}
            style={{ x: spring(currentPaneIndex * 100) }}
          >
            {style => (
              <div style={{ transform: `translateX(${-style.x}%)` }}>
                {panes.map(pane => (
                  <div
                    key={pane.key}
                    className={classes.pane}
                    style={paneStyles}
                  >
                    {pane.children}
                  </div>
                ))}
              </div>
            )}
          </Motion>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PanePicker);
