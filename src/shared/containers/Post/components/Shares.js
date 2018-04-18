import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";

import FacebookIcon from "components/Icon/FacebookIcon";
import TwitterIcon from "components/Icon/TwitterIcon";
import FacebookShare from "components/Share/FacebookShare";
import TwitterShare from "components/Share/TwitterShare";

const styles = theme => ({
  root: {
    marginTop: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    margin: [[0, 25]],
    padding: [[10, 25]],
    display: "flex",
    alignItems: "center",
    fontSize: 20,
    color: "#999",
    transition: "color 0.3s",

    "&:hover": {
      color: "#555",

      "& $icon": {
        color: "#555"
      }
    }
  },
  icon: {
    width: 74,
    height: 74,
    marginRight: 10,
    color: "#DDD",
    transition: "color 0.3s"
  },
  "@media screen and (max-width: 640px)": {
    button: {
      margin: [[0, 10]],
      padding: [[10, 10]]
    },
    icon: {
      width: 50,
      height: 50
    }
  },
  "@media screen and (max-width: 480px)": {
    root: {
      marginTop: 50
    },
    label: {
      display: "none"
    }
  }
});

const Shares = ({ title, url, push, classes }) => {
  return (
    <div className={classes.root}>
      <FacebookShare url={url}>
        <ButtonBase className={classes.button}>
          <FacebookIcon className={classes.icon} />
          <span className={classes.label}>Partager</span>
        </ButtonBase>
      </FacebookShare>
      <TwitterShare url={url} text={title}>
        <ButtonBase className={classes.button}>
          <TwitterIcon className={classes.icon} />
          <span className={classes.label}>Tweeter</span>
        </ButtonBase>
      </TwitterShare>
    </div>
  );
};

export default withStyles(styles)(Shares);
