import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { fill } from "lodash";
import classnames from "classnames";
import { lighten, rgba } from "polished";

const styles = theme => ({
  grid: {
    display: "flex",
    flexWrap: "wrap",
    margin: [[0, -1]]
  },
  cell: {
    flexGrow: 1,
    flexBasis: 60,
    textAlign: "center",
    lineHeight: "60px",
    border: [[theme.picker.borderColor, "solid"]],
    borderWidth: [[0, 1, 1, 0]],
    cursor: "pointer",

    "&:hover": {
      background: lighten(0.98, "black")
    }
  },
  readOnly: {
    position: "relative",

    "&:after": {
      content: `""`,
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: rgba("white", 0.7)
    }
  },
  label: {},
  active: {
    "& $label": {
      color: "white",
      background: theme.palette.primary[500],
      borderRadius: "100%",
      display: "inline-block",
      width: 34,
      height: 34,
      lineHeight: "34px",
      marginTop: 13
    }
  },
  cellGhost: {
    height: 0,
    border: 0
  }
});

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
      classes,
      onChange = () => {}
    } = this.props;

    return (
      <div
        className={classnames(classes.grid, { [classes.readOnly]: readOnly })}
      >
        {items.map(item => (
          <div
            key={item.key}
            className={classnames(classes.cell, {
              [classes.active]: current === item.key
            })}
            onClick={() =>
              !readOnly && onChange(current === item.key ? undefined : item.key)
            }
          >
            <span className={classes.label}>{item.label}</span>
          </div>
        ))}

        {fill(new Array(20), 0).map((value, index) => (
          <div key={index} className={`${classes.cell} ${classes.cellGhost}`} />
        ))}
      </div>
    );
  }
}

export default withStyles(styles)(GridPicker);
