import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  footer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    height: theme.footer.height,
    background: "#1f1f1f",
    textAlign: "center",
    fontWeight: 300,
    fontSize: "1.1rem",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  }
});

const Footer = ({ classes }) => (
  <div className={classes.footer}>
    <span>Copyright © {new Date().getFullYear()} Église Lyon Gerland.</span>
  </div>
);

export default withStyles(styles)(Footer);
