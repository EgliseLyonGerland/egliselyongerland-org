import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    margin: [[100, 30]]
  },
  content: {
    maxWidth: 500,
    margin: [[0, "auto"]],
    padding: 20,
    fontSize: 16,
    textAlign: "center",
    fontWeight: 400,
    color: "#999",
    border: "1px solid",
    borderColor: "#e5e6e9 #dfe0e4 #d0d1d5",
    background: "white"
  },
  line: {
    marginTop: 20,

    "&:first-child": {
      marginTop: 0
    }
  },
  "@media screen and (max-width: 640px)": {
    root: {
      margin: [[50, 30]]
    }
  }
});

const NoTranscription = ({ classes }) => {
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div className={classes.line}>
          La transcription de cet enregistrement n'est pas actuellement
          disponible. Merci de votre compréhension !
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(NoTranscription);
