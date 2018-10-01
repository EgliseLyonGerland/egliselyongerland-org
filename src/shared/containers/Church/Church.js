import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduce } from 'lodash';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { renderRoutes } from 'react-router-config';

import Jumbotron from 'components/Jumbotron/Jumbotron';

import churchTabs from '../../config/church-tabs';

const getTab = slug =>
  reduce(
    churchTabs,
    (prev, curr) => {
      if (curr.slug === slug) {
        return curr;
      }

      return prev;
    },
    churchTabs[0],
  );

const styles = theme => ({
  tabs: {
    background: theme.palette.primary[500],
  },
  tab: {
    height: 70,
    textTransform: 'none',
    minWidth: 'auto',
  },
});

const mapStateToProps = state => ({ browser: state.browser });

class Church extends Component {
  constructor() {
    super();

    this.handleTabChange = this.handleTabChange.bind(this);
  }

  handleTabChange(event, slug) {
    const { history } = this.props;

    history.push(`/${slug}`);
  }

  render() {
    const { location, classes, browser, route } = this.props;
    const currentTab = getTab(location.pathname.substr(1));

    return (
      <div>
        <Helmet title={currentTab.title} />
        <Jumbotron
          background={currentTab.picture}
          height="500px"
          title={currentTab.title}
        />

        <AppBar elevation={0} position="static">
          <Tabs
            className={classes.tabs}
            scrollable={browser.width < 750}
            value={currentTab.slug}
            centered
            onChange={this.handleTabChange}
          >
            {churchTabs.map(tab => (
              <Tab
                key={tab.slug}
                className={classes.tab}
                label={tab.title}
                value={tab.slug}
              />
            ))}
          </Tabs>
        </AppBar>

        {renderRoutes(route.routes)}
      </div>
    );
  }
}

Church.propTypes = {
  browser: PropTypes.shape().isRequired,
  classes: PropTypes.shape().isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape().isRequired,
  route: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(Church));
