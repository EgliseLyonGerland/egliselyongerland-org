import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { lighten, rgba, clearFix } from "polished";

import { Text } from "components";
import ToggleOnIcon from "components/Icon/ToggleOnIcon";
import ToggleOffIcon from "components/Icon/ToggleOffOutlinedIcon";

const styles = theme => ({
  label: {
    ...clearFix(),
    padding: [[7, 15]],
    borderBottom: [[theme.picker.borderColor, "solid", 1]],
    cursor: "pointer",

    "&:hover": {
      background: lighten(0.98, "black")
    }
  },
  more: {
    textAlign: "center"
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
  }
});

class LabelPicker extends Component {
  static propTypes = {
    labels: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.any.isRequired,
        label: PropTypes.string.isRequired
      })
    ).isRequired,
    current: PropTypes.any,
    children: PropTypes.func,
    readOnly: PropTypes.bool,
    crop: PropTypes.number,
    onChange: PropTypes.func
  };

  constructor() {
    super();

    this.state = {
      opened: false
    };
  }

  render() {
    const {
      labels,
      crop = null,
      current = null,
      readOnly = false,
      children,
      classes,
      onChange = () => {}
    } = this.props;

    const { opened } = this.state;

    return (
      <div className={readOnly ? classes.readOnly : ""}>
        {labels.map((label, index) => {
          if (!opened && crop !== null && index >= crop) {
            return null;
          }

          return (
            <div
              key={label.key}
              className={classes.label}
              onClick={() =>
                !readOnly &&
                onChange(label.key === current ? undefined : label.key)
              }
            >
              <span className="pull-right">
                {current === label.key ? <ToggleOnIcon /> : <ToggleOffIcon />}
              </span>

              {children ? (
                children(label)
              ) : (
                <Text fontSize={1} maxLines={1} ellipsis>
                  {label.label}
                </Text>
              )}
            </div>
          );
        })}

        {crop !== null &&
          labels.length > crop && (
            <div
              className={`${classes.label} ${classes.more}`}
              onClick={() => this.setState({ opened: !opened })}
            >
              <a>Afficher {opened ? "moins" : "plus"}</a>
            </div>
          )}
      </div>
    );
  }
}

export default withStyles(styles)(LabelPicker);
