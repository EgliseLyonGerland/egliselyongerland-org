import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  overlay: {
    background: "rgba(0, 0, 0, 0.7)",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    zIndex: theme.overlay.zindex,
    opacity: 0,
    cursor: "pointer",
    visibility: "hidden",
    transition: "visibility 0s linear 0.2s, opacity 0.2s linear"
  },
  active: {
    visibility: "visible",
    opacity: 1,
    transitionDelay: 0
  }
});

const Overlay = ({ active, onClicked, classes }) => (
  <div
    className={`${classes.overlay} ${active ? classes.active : ""}`}
    onClick={() => onClicked()}
  />
);

Overlay.propTypes = {
  active: PropTypes.bool,
  onClicked: PropTypes.func
};

Overlay.defaultProps = {
  active: false,
  onClicked: () => {}
};

export default withStyles(styles)(Overlay);
