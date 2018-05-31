import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import picture from "./default.jpg";

const getBonus = str => {
  return 1 + 1 / str.length;
};

const styles = theme => ({
  jumbotron: {
    background: "#124765",
    backgroundImage: "url(/generic-bg.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    position: "relative",

    "&:before": {
      content: `""`,
      position: "absolute",
      display: "block",
      height: "100%",
      width: "100%",
      top: 0,
      left: 0,
      background: "rgba(0, 0, 0, 0.2)"
    }
  },
  inner: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    background: "rgba(0, 0, 0, 0.2)"
  },
  emptyRow1: {
    minHeight: theme.header.height
  },
  emptyRow2: {
    height: "8vh",
    minHeight: 50
  },
  emptyRow3: {
    height: "10vh",
    minHeight: 40
  },
  title: {
    display: "block",
    fontSize: 44,
    fontWeight: theme.typography.fontWeights.light,
    margin: [[0, 20]],
    textAlign: "center",
    color: "white",
    maxWidth: 790,
    padding: [[0, 20]]
  },
  "@media screen and (max-width: 960px)": {
    emptyRow1: {
      minHeight: theme.header.sticky.height
    }
  },
  "@media screen and (max-width: 640px), screen and (max-height: 640px)": {
    title: {
      fontSize: 32
    },
    emptyRow3: {
      height: "5vh"
    }
  }
});

const Jumbotron = ({ title, background, classes, children }) => (
  <div
    className={classes.jumbotron}
    style={{ backgroundImage: `url(${background || picture})` }}
  >
    <div className={classes.inner}>
      <div className={classes.emptyRow1} />
      <div className={classes.emptyRow2} />

      {title && (
        <div className={classes.title}>
          <h1 style={{ fontSize: `${getBonus(title)}em` }}>{title}</h1>
        </div>
      )}

      {children}

      <div className={classes.emptyRow3} />
    </div>
  </div>
);

Jumbotron.propTypes = {
  background: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.any
};

Jumbotron.defaultProps = {
  background: null,
  title: null,
  children: null
};

export default withStyles(styles)(Jumbotron);
