import React, { Component } from "react";
import PropTypes from "prop-types";
import keycode from "keycode";
import transitions from "@material-ui/core/styles/transitions";

/**
 * Verifies min/max range.
 * @param   {Object} props         Properties of the React component.
 * @param   {String} propName      Name of the property to validate.
 * @param   {String} componentName Name of the component whose property is being validated.
 * @returns {Object} Returns an Error if min >= max otherwise null.
 */
const minMaxPropType = (props, propName, componentName, ...rest) => {
  const error = PropTypes.number(props, propName, componentName, ...rest);
  if (error !== null) {
    return error;
  }

  if (props.min >= props.max) {
    const errorMsg =
      propName === "min"
        ? "min should be less than max"
        : "max should be greater than min";
    return new Error(errorMsg);
  }
};

/**
 * Verifies value is within the min/max range.
 * @param   {Object} props         Properties of the React component.
 * @param   {String} propName      Name of the property to validate.
 * @param   {String} componentName Name of the component whose property is being validated.
 * @returns {Object} Returns an Error if the value is not within the range otherwise null.
 */
const valueInRangePropType = (props, propName, componentName, ...rest) => {
  const error = PropTypes.number(props, propName, componentName, ...rest);
  if (error !== null) {
    return error;
  }

  const value = props[propName];
  if (value < props.min || props.max < value) {
    return new Error(
      `${propName} should be within the range specified by min and max`
    );
  }
};

const crossAxisProperty = {
  x: "height",
  "x-reverse": "height",
  y: "width",
  "y-reverse": "width"
};

const crossAxisOffsetProperty = {
  x: "top",
  "x-reverse": "top",
  y: "left",
  "y-reverse": "left"
};

const mainAxisProperty = {
  x: "width",
  "x-reverse": "width",
  y: "height",
  "y-reverse": "height"
};

const mainAxisMarginFromEnd = {
  x: "marginRight",
  "x-reverse": "marginLeft",
  y: "marginTop",
  "y-reverse": "marginBottom"
};

const mainAxisMarginFromStart = {
  x: "marginLeft",
  "x-reverse": "marginRight",
  y: "marginBottom",
  "y-reverse": "marginTop"
};

const mainAxisOffsetProperty = {
  x: "left",
  "x-reverse": "right",
  y: "bottom",
  "y-reverse": "top"
};

const mainAxisClientProperty = {
  x: "clientWidth",
  "x-reverse": "clientWidth",
  y: "clientHeight",
  "y-reverse": "clientHeight"
};

const mainAxisClientOffsetProperty = {
  x: "clientX",
  "x-reverse": "clientX",
  y: "clientY",
  "y-reverse": "clientY"
};

const reverseMainAxisOffsetProperty = {
  x: "right",
  "x-reverse": "left",
  y: "top",
  "y-reverse": "bottom"
};

const isMouseControlInverted = axis => axis === "x-reverse" || axis === "y";

function getPercent(value, min, max) {
  let percent = (value - min) / (max - min);
  if (isNaN(percent)) {
    percent = 0;
  }

  return percent;
}

const getStyles = (props, context, state) => {
  const { axis, disabled, max, min } = props;

  const handleColorZero = "white";
  const handleFillColor = "white";
  const handleSize = 12;
  const handleSizeDisabled = 8;
  const handleSizeActive = 18;
  const trackSize = 2;
  const trackColor = "rgba(255, 255, 255, 0.5)";
  const trackColorSelected = "rgba(255, 255, 255, 0.5)";
  const selectionColor = "white";

  const fillGutter = handleSize / 2;
  const disabledGutter = trackSize + handleSizeDisabled / 2;
  const calcDisabledSpacing = disabled ? ` - ${disabledGutter}px` : "";
  const percent = getPercent(state.value, min, max);

  const styles = {
    slider: {
      touchCallout: "none",
      userSelect: "none",
      cursor: "default",
      [crossAxisProperty[axis]]: handleSizeActive,
      [mainAxisProperty[axis]]: "100%",
      position: "relative"
    },
    track: {
      position: "absolute",
      [crossAxisOffsetProperty[axis]]: (handleSizeActive - trackSize) / 2,
      [mainAxisOffsetProperty[axis]]: 0,
      [mainAxisProperty[axis]]: "100%",
      [crossAxisProperty[axis]]: trackSize
    },
    filledAndRemaining: {
      directionInvariant: true,
      position: "absolute",
      [crossAxisOffsetProperty]: 0,
      [crossAxisProperty[axis]]: "100%",
      // transition: transitions.easeOut(null, "margin")
      transition: transitions.create("margin")
    },
    handle: {
      directionInvariant: true,
      boxSizing: "border-box",
      position: "absolute",
      cursor: "pointer",
      pointerEvents: "inherit",
      [crossAxisOffsetProperty[axis]]: 0,
      [mainAxisOffsetProperty[axis]]:
        percent === 0 ? "0%" : `${percent * 100}%`,
      zIndex: 1,
      margin: {
        x: `${trackSize / 2}px 0 0 0`,
        "x-reverse": `${trackSize / 2}px 0 0 0`,
        y: `0 0 0 ${trackSize / 2}px`,
        "y-reverse": `0 0 0 ${trackSize / 2}px`
      }[axis],
      width: handleSize,
      height: handleSize,
      backgroundColor: selectionColor,
      backgroundClip: "padding-box",
      border: "0px solid transparent",
      borderRadius: "50%",
      transform: {
        x: "translate(-50%, -50%)",
        "x-reverse": "translate(50%, -50%)",
        y: "translate(-50%, 50%)",
        "y-reverse": "translate(-50%, -50%)"
      }[axis],
      // transition: `${transitions.easeOut(
      //   "450ms",
      //   "background"
      // )}, ${transitions.easeOut(
      //   "450ms",
      //   "border-color"
      // )}, ${transitions.easeOut("450ms", "width")}, ${transitions.easeOut(
      //   "450ms",
      //   "height"
      // )}`,
      transition: [
        transitions.create("background"),
        transitions.create("border-color"),
        transitions.create("width"),
        transitions.create("height")
      ].join(","),
      overflow: "visible",
      outline: "none"
    },
    handleWhenDisabled: {
      boxSizing: "content-box",
      cursor: "not-allowed",
      backgroundColor: trackColor,
      width: handleSizeDisabled,
      height: handleSizeDisabled,
      border: "none"
    },
    handleWhenPercentZero: {
      border: `${trackSize}px solid ${handleColorZero}`,
      backgroundColor: handleFillColor,
      boxShadow: "none"
    },
    handleWhenPercentZeroAndDisabled: {
      cursor: "not-allowed",
      width: handleSizeDisabled,
      height: handleSizeDisabled
    },
    handleWhenPercentZeroAndFocused: {
      border: `${trackSize}px solid ${trackColorSelected}`
    },
    handleWhenActive: {
      width: handleSizeActive,
      height: handleSizeActive
    }
  };
  styles.filled = Object.assign({}, styles.filledAndRemaining, {
    [mainAxisOffsetProperty[axis]]: 0,
    backgroundColor: disabled ? trackColor : selectionColor,
    [mainAxisMarginFromEnd[axis]]: fillGutter,
    [mainAxisProperty[axis]]: `calc(${percent * 100}%${calcDisabledSpacing})`
  });
  styles.remaining = Object.assign({}, styles.filledAndRemaining, {
    [reverseMainAxisOffsetProperty[axis]]: 0,
    backgroundColor:
      (state.hovered || state.focused) && !disabled
        ? trackColorSelected
        : trackColor,
    [mainAxisMarginFromStart[axis]]: fillGutter,
    [mainAxisProperty[axis]]: `calc(${(1 - percent) *
      100}%${calcDisabledSpacing})`
  });

  return styles;
};

class Slider extends Component {
  static propTypes = {
    /**
     * The axis on which the slider will slide.
     */
    axis: PropTypes.oneOf(["x", "x-reverse", "y", "y-reverse"]),
    /**
     * The default value of the slider.
     */
    defaultValue: valueInRangePropType,
    /**
     * If true, the slider will not be interactable.
     */
    disabled: PropTypes.bool,
    /**
     * The maximum value the slider can slide to on
     * a scale from 0 to 1 inclusive. Cannot be equal to min.
     */
    max: minMaxPropType,
    /**
     * The minimum value the slider can slide to on a scale
     * from 0 to 1 inclusive. Cannot be equal to max.
     */
    min: minMaxPropType,
    /** @ignore */
    onBlur: PropTypes.func,
    /**
     * Callback function that is fired when the slider's value changed.
     *
     * @param {object} event KeyDown event targeting the slider.
     * @param {number} newValue The new value of the slider.
     */
    onChange: PropTypes.func,
    /**
     * Callback function that is fired when the slider has begun to move.
     *
     * @param {object} event MouseDown or TouchStart event targeting the slider.
     */
    onDragStart: PropTypes.func,
    /**
     * Callback function that is fired when the slide has stopped moving.
     *
     * @param {object} event MouseEnd or TouchEnd event targeting the slider.
     */
    onDragStop: PropTypes.func,
    /** @ignore */
    onFocus: PropTypes.func,
    /**
     * Whether or not the slider is required in a form.
     */
    required: PropTypes.bool,
    /**
     * Override the inline-styles of the inner slider element.
     */
    sliderStyle: PropTypes.object,
    /**
     * The granularity the slider can step through values.
     */
    step: PropTypes.number,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
    /**
     * The value of the slider.
     */
    value: valueInRangePropType
  };

  static defaultProps = {
    axis: "x",
    disabled: false,
    max: 1,
    min: 0,
    required: true,
    step: 0.01,
    style: {}
  };

  state = {
    active: false,
    dragging: false,
    focused: false,
    hovered: false,
    value: 0
  };

  componentWillMount() {
    const { value: valueProp, defaultValue, min } = this.props;

    let value = valueProp;
    if (value === undefined) {
      value = defaultValue !== undefined ? defaultValue : min;
    }

    this.setState({
      value: this.resolveValue(value)
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== undefined && !this.state.dragging) {
      this.setState({
        value: this.resolveValue(nextProps.value)
      });
    }
  }

  track = null;
  handle = null;

  resolveValue = value => {
    const { max, min } = this.props;

    if (value > max) {
      return max;
    }

    if (value < min) {
      return min;
    }

    return value;
  };

  handleKeyDown = event => {
    const { axis, min, max, step } = this.props;

    let action;

    switch (keycode(event)) {
      case "page down":
      case "down":
        if (axis === "y-reverse") {
          action = "increase";
        } else {
          action = "decrease";
        }
        break;
      case "left":
        if (axis === "x-reverse") {
          action = "increase";
        } else {
          action = "decrease";
        }
        break;
      case "page up":
      case "up":
        if (axis === "y-reverse") {
          action = "decrease";
        } else {
          action = "increase";
        }
        break;
      case "right":
        if (axis === "x-reverse") {
          action = "decrease";
        } else {
          action = "increase";
        }
        break;
      case "home":
        action = "min";
        break;
      case "end":
        action = "max";
        break;
      default:
    }

    if (action) {
      let newValue;

      // Cancel scroll
      event.preventDefault();

      switch (action) {
        case "decrease":
          newValue = this.state.value - step;
          break;
        case "increase":
          newValue = this.state.value + step;
          break;
        case "min":
          newValue = min;
          break;
        case "max":
          newValue = max;
          break;
        default:
      }

      // We need to use toFixed() because of float point errors.
      // For example, 0.01 + 0.06 = 0.06999999999999999
      newValue = this.resolveValue(parseFloat(newValue.toFixed(5)));

      if (this.state.value !== newValue) {
        this.setState({
          value: newValue
        });

        if (this.props.onChange) {
          this.props.onChange(event, newValue);
        }
      }
    }
  };

  handleDragMouseMove = event => {
    this.onDragUpdate(event, "mouse");
  };

  handleTouchMove = event => {
    this.onDragUpdate(event, "touch");
  };

  handleMouseEnd = event => {
    document.removeEventListener("mousemove", this.handleDragMouseMove);
    document.removeEventListener("mouseup", this.handleMouseEnd);

    this.onDragStop(event);
  };

  handleTouchEnd = event => {
    document.removeEventListener("touchmove", this.handleTouchMove);
    document.removeEventListener("touchup", this.handleTouchEnd);
    document.removeEventListener("touchend", this.handleTouchEnd);
    document.removeEventListener("touchcancel", this.handleTouchEnd);

    this.onDragStop(event);
  };

  handleTouchStart = event => {
    const { axis, disabled } = this.props;

    if (disabled) {
      return;
    }

    let position;
    if (isMouseControlInverted(axis)) {
      position =
        this.getTrackOffset() -
        event.touches[0][mainAxisClientOffsetProperty[axis]];
    } else {
      position =
        event.touches[0][mainAxisClientOffsetProperty[axis]] -
        this.getTrackOffset();
    }
    this.setValueFromPosition(event, position);

    document.addEventListener("touchmove", this.handleTouchMove);
    document.addEventListener("touchup", this.handleTouchEnd);
    document.addEventListener("touchend", this.handleTouchEnd);
    document.addEventListener("touchcancel", this.handleTouchEnd);

    this.onDragStart(event);

    // Cancel scroll and context menu
    event.preventDefault();
  };

  handleFocus = event => {
    this.setState({
      focused: true
    });

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  handleBlur = event => {
    this.setState({
      focused: false,
      active: false
    });

    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  };

  handleMouseDown = event => {
    const { axis, disabled } = this.props;

    if (disabled) {
      return;
    }

    let position;
    if (isMouseControlInverted(axis)) {
      position =
        this.getTrackOffset() - event[mainAxisClientOffsetProperty[axis]];
    } else {
      position =
        event[mainAxisClientOffsetProperty[axis]] - this.getTrackOffset();
    }
    this.setValueFromPosition(event, position);

    document.addEventListener("mousemove", this.handleDragMouseMove);
    document.addEventListener("mouseup", this.handleMouseEnd);

    // Cancel text selection
    event.preventDefault();

    // Set focus manually since we called preventDefault()
    this.handle.focus();

    this.onDragStart(event);
  };

  handleMouseUp = () => {
    if (!this.props.disabled) {
      this.setState({
        active: false
      });
    }
  };

  handleMouseEnter = () => {
    this.setState({
      hovered: true
    });
  };

  handleMouseLeave = () => {
    this.setState({
      hovered: false
    });
  };

  getTrackOffset() {
    const { axis } = this.props;

    return this.track.getBoundingClientRect()[mainAxisOffsetProperty[axis]];
  }

  onDragStart(event) {
    this.setState({
      dragging: true,
      active: true
    });

    if (this.props.onDragStart) {
      this.props.onDragStart(event);
    }
  }

  onDragUpdate(event, type) {
    const { axis, disabled } = this.props;

    if (this.dragRunning) {
      return;
    }
    this.dragRunning = true;

    requestAnimationFrame(() => {
      this.dragRunning = false;

      const source = type === "touch" ? event.touches[0] : event;

      let position;
      if (isMouseControlInverted(axis)) {
        position =
          this.getTrackOffset() - source[mainAxisClientOffsetProperty[axis]];
      } else {
        position =
          source[mainAxisClientOffsetProperty[axis]] - this.getTrackOffset();
      }

      if (!disabled) {
        this.setValueFromPosition(event, position);
      }
    });
  }

  onDragStop(event) {
    this.setState({
      dragging: false,
      active: false
    });

    if (this.props.onDragStop) {
      this.props.onDragStop(event);
    }
  }

  setValueFromPosition(event, position) {
    const { axis, step, min, max } = this.props;

    const positionMax = this.track[mainAxisClientProperty[axis]];

    let value;

    if (position <= 0) {
      value = min;
    } else if (position >= positionMax) {
      value = max;
    } else {
      value = (position / positionMax) * (max - min);
      value = Math.round(value / step) * step + min;
      value = parseFloat(value.toFixed(5));
    }

    value = this.resolveValue(value);

    if (this.state.value !== value) {
      this.setState({
        value: value
      });

      if (this.props.onChange) {
        this.props.onChange(event, value);
      }
    }
  }

  render() {
    const {
      axis, // eslint-disable-line no-unused-vars
      disabled,
      max,
      min,
      name,
      onBlur, // eslint-disable-line no-unused-vars
      onChange, // eslint-disable-line no-unused-vars
      onDragStart, // eslint-disable-line no-unused-vars
      onDragStop, // eslint-disable-line no-unused-vars
      onFocus, // eslint-disable-line no-unused-vars
      required,
      sliderStyle,
      step,
      style,
      value: propValue, // eslint-disable-line no-unused-vars
      ...other
    } = this.props;

    const { active, focused, hovered, value } = this.state;

    const styles = getStyles(this.props, this.context, this.state);
    const percent = getPercent(value, min, max);

    let handleStyles = {};
    if (percent === 0) {
      handleStyles = Object.assign(
        {},
        styles.handle,
        styles.handleWhenPercentZero,
        active && styles.handleWhenActive,
        (hovered || focused) &&
          !disabled &&
          styles.handleWhenPercentZeroAndFocused,
        disabled && styles.handleWhenPercentZeroAndDisabled
      );
    } else {
      handleStyles = Object.assign(
        {},
        styles.handle,
        active && styles.handleWhenActive,
        disabled && styles.handleWhenDisabled
      );
    }

    return (
      <div {...other} style={Object.assign({}, style)}>
        <div
          style={Object.assign({}, styles.slider, sliderStyle)}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onMouseDown={this.handleMouseDown}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onMouseUp={this.handleMouseUp}
          onTouchStart={this.handleTouchStart}
          onKeyDown={!disabled && this.handleKeyDown}
        >
          <div ref={node => (this.track = node)} style={styles.track}>
            <div style={styles.filled} />
            <div style={styles.remaining} />
            <div
              ref={node => (this.handle = node)}
              style={handleStyles}
              tabIndex={0}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Slider;
