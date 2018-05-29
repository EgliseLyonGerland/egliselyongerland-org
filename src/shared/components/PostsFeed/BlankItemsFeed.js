import React, { Component } from "react";
import PropTypes from "prop-types";
import { range } from "lodash";
import classnames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import { clearFix } from "polished";

const styles = theme => ({
  item: {
    ...clearFix(),

    marginBottom: theme.postFeed.margin / 2,

    "&:after": {
      clear: "both",
      content: `""`,
      width: 120,
      paddingTop: theme.postFeed.margin / 2 + 3,
      display: "block",
      margin: [[0, "auto"]],
      backgroundImage:
        "linear-gradient(to right, #ccc 33%, rgba(255, 255, 255, 0) 0%)",
      backgroundPosition: [[10, "bottom"]],
      backgroundSize: [[10, 3]],
      backgroundRepeat: "repeat-x"
    },

    "&:last-child:after ": {
      display: "none",
      marginBottom: 0
    }
  },
  picture: {
    float: "left",
    width: theme.postFeed.pictureWidth,
    height: theme.postFeed.pictureHeight
  },
  content: {
    marginLeft: theme.postFeed.pictureWidth + 30,
    paddingTop: 5
  },
  line: {
    borderRadius: 5,
    position: "relative",
    height: 12,
    marginBottom: 12,
    animationDuration: "2s",
    animationFillMode: "forwards",
    animationIterationCount: "infinite",
    animationName: "placeHolderShimmer",
    animationTimingFunction: "cubic-bezier(0.18, 0.89, 0.73, 1.04)",
    background:
      "linear-gradient(to right, transparent 8%, rgba(255, 255, 255, 0.4) 18%, transparent 33%)",
    backgroundSize: [[800, 104]]
  },
  line1: {
    marginBottom: 22,
    width: "40%"
  },
  line2: {
    width: "90%"
  },
  line3: {
    width: "62%"
  },
  "@keyframes placeHolderShimmer": {
    "0%": {
      backgroundPosition: [["100%", 0]]
    },
    "80%": {
      backgroundPosition: [["-150%", 0]]
    },
    "100%": {
      backgroundPosition: [["-150%", 0]]
    }
  }
});

class BlankItemsFeed extends Component {
  static propTypes = {
    items: PropTypes.number,
    color: PropTypes.string,
    horizontal: PropTypes.bool
  };

  static defaultProps = {
    color: "#e5eef1",
    horizontal: false
  };

  render() {
    const { items, color, horizontal, classes } = this.props;

    return (
      <div className={horizontal ? classes.horizontal : ""}>
        {range(0, items).map((value, index) => (
          <div className={classes.item} key={index}>
            <div
              className={classes.picture}
              style={{ backgroundColor: color }}
            />
            <div className={classes.content}>
              <div
                className={classnames(classes.line, classes.line1)}
                style={{ backgroundColor: color }}
              />
              <div
                className={classnames(classes.line, classes.line2)}
                style={{ backgroundColor: color }}
              />
              <div
                className={classnames(classes.line, classes.line3)}
                style={{ backgroundColor: color }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default withStyles(styles)(BlankItemsFeed);
