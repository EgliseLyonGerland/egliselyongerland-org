import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { range } from "lodash";
import classnames from "classnames";

import Button from "components/Button/Button";

// import styles from "./PostContent.scss";

const headings = range(1, 6)
  .map(level => `& > h${level}`)
  .join(",");

const styles = theme => ({
  root: {
    fontSize: 20,
    lineHeight: "38px",
    color: "#333",
    padding: [[0, 40]],
    height: 800,
    overflowY: "hidden",
    position: "relative",

    "&:after": {
      content: "''",
      display: "block",
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: 100,
      background:
        "linear-gradient(to top, rgba(252,252,252,1) 0%, rgba(252,252,252,0) 100%)"
    },

    "&.full": {
      height: "auto",
      overflowY: "inherit",

      "&:after": {
        display: "none"
      }
    },

    "& > *:first-child": {
      marginTop: 100
    },

    "& > p": {
      maxWidth: 630,
      margin: [[50, "auto"]]
    },

    [headings]: {
      display: "block",
      maxWidth: 350,
      margin: [[100, "auto", 50]],
      fontSize: 30,
      textAlign: "center",
      color: theme.palette.primary[500],

      "&:after": {
        content: "''",
        display: "block",
        ...theme.gradient(),
        width: 140,
        height: 1,
        margin: [[30, "auto", 0]]
      }
    },

    "& > blockquote": {
      fontWeight: theme.typography.fontWeights.regular,
      fontStyle: "italic",
      color: "#555",
      maxWidth: 780,
      margin: [[90, "auto"]],
      fontSize: 30,
      lineHeight: "48px",
      textAlign: "center"
    },

    "& > p > img": {
      margin: [[0, -40]],
      width: 710,
      height: "auto",
      maxWidth: "100vw"
    }
  },
  more: {
    marginTop: 50,
    textAlign: "center"
  },

  "@media screen and (max-width: 640px)": {
    root: {
      padding: [[0, 20]],
      fontSize: 18,
      lineHeight: "30px",

      "& > *:first-child": {
        marginTop: 50
      },

      "& > p": {
        margin: [[30, "auto"]]
      },

      [headings]: {
        margin: [[50, "auto", 30]],
        fontSize: 24,

        "&:after": {
          width: 110,
          margin: [[20, "auto", 0]]
        }
      },

      "& > blockquote": {
        margin: [[50, "auto"]],
        fontSize: 20,
        lineHeight: "28px"
      },

      "& > p > img": {
        margin: [[0, -20]]
      }
    }
  }
});

class PostContent extends Component {
  static propTypes = {
    content: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      full: props.content.length < 200
    };
  }

  render() {
    const { content, classes } = this.props;
    const { full } = this.state;

    return (
      <div>
        <div
          className={classnames(classes.root, { full })}
          dangerouslySetInnerHTML={{ __html: content }}
        />
        {!full && (
          <div className={classes.more}>
            <Button
              color="primary"
              onClick={() => this.setState({ full: true })}
            >
              Lire la suite
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(PostContent);
