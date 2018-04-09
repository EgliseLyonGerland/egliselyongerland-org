import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router";
import { withStyles } from "material-ui";
import classnames from "classnames";

const styles = theme => ({
  sidebar: {
    background: "#124765",
    color: "white",
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    visibility: "hidden",
    opacity: 0,
    transition: "opacity 0.15s, visibility 0s 0.15s",
    transitionTimingFunction: "ease-in-out",
    overflow: "hidden",
    zIndex: theme.sidebar.zindex,
    display: "flex"
  },
  opened: {
    transition: "visibility 0s, opacity 0.15s",
    visibility: "visible",
    opacity: 1
  },
  content: {
    textAlign: "center",
    margin: [[theme.header.height, "auto"]]
  },
  link: {
    display: "block",
    color: "white",
    fontWeight: 400,
    textDecoration: "none",
    fontSize: 20,
    textTransform: "uppercase",
    marginBottom: 10,
    transition: "transform 0.2s",

    "&:hover": {
      transform: "scale(1.05)"
    }
  }
});

class Sidebar extends Component {
  static propTypes = {
    links: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired
      })
    ),
    opened: PropTypes.bool,
    onOpenSidebarButtonClicked: PropTypes.func,
    onCloseSidebarButtonClicked: PropTypes.func
  };

  static defaultProps = {
    opened: false,
    onOpenSidebarButtonClicked: () => {},
    onCloseSidebarButtonClicked: () => {}
  };

  toggle() {
    if (this.props.opened) {
      this.props.onCloseSidebarButtonClicked();
    } else {
      this.props.onOpenSidebarButtonClicked();
    }
  }

  render() {
    const { links, opened, classes } = this.props;

    return (
      <div className={classnames(classes.sidebar, opened && classes.opened)}>
        <div className={classes.content}>
          {links.map(link => (
            <Link key={link.path} to={link.path} className={classes.link}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Sidebar);
