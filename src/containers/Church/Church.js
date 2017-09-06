import React, { Component } from "react";
import { reduce } from "lodash";
import { connect } from "react-redux";
import Tabs, { Tab } from "material-ui/Tabs";
import { withStyles } from "material-ui/styles";
import AppBar from "material-ui/AppBar";

import { Container, Jumbotron } from "components";

import churchTabs from "../../config/church-tabs";

const getTab = slug => {
  return reduce(
    churchTabs,
    (prev, curr) => {
      if (curr.slug === slug) {
        return curr;
      }

      return prev;
    },
    churchTabs[0]
  );
};

const styles = theme => ({
  tabs: {
    background: theme.palette.primary[500]
  },
  tab: {
    height: 70,
    textTransform: "none",
    minWidth: "auto"
  }
});

const mapStateToProps = state => ({ browser: state.browser });

class Church extends Component {
  constructor() {
    super();

    this.handleTabChange = this.handleTabChange.bind(this);
  }

  handleTabChange(event, slug) {
    this.props.router.push(`/${slug}`);
  }

  render() {
    const { location, classes, browser } = this.props;
    const currentTab = getTab(location.pathname.substr(1));

    return (
      <div>
        <Jumbotron
          height="500px"
          title={currentTab.title}
          background={currentTab.picture}
        />

        <AppBar position="static" elevation={0}>
          <Tabs
            className={classes.tabs}
            value={currentTab.slug}
            onChange={this.handleTabChange}
            centered
            scrollable={browser.width < 750}
          >
            {churchTabs.map(tab =>
              <Tab
                key={tab.slug}
                label={tab.title}
                value={tab.slug}
                className={classes.tab}
              />
            )}
          </Tabs>
        </AppBar>

        {this.props.children}
      </div>
    );
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Church));