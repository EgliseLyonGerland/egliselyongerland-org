import React, { Component } from 'react';
import PropTypes from 'prop-types';
import reduce from 'lodash/reduce';
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

const styles = {
  tabsWrapper: {
    borderBottom: [['#EEE', 'solid', 1]],
  },
  tabsFlexContainer: {
    // Petit hack permettant de contrer le fait que le composant Tabs ne
    // permet de cumuller les options `scrollable` et `centered`
    // https://github.com/mui-org/material-ui/issues/10235
    '@media screen and (min-width: 800px)': {
      justifyContent: 'center',
    },
  },
  tab: {
    height: 70,
    textTransform: 'none',
    minWidth: 'auto',
  },
};

@withStyles(styles)
class Church extends Component {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    location: PropTypes.shape().isRequired,
    route: PropTypes.shape().isRequired,
  };

  constructor() {
    super();

    this.handleTabChange = this.handleTabChange.bind(this);
  }

  handleTabChange(event, slug) {
    const { history } = this.props;

    history.push(`/${slug}`);
  }

  render() {
    const { location, classes, route } = this.props;
    const currentTab = getTab(location.pathname.substr(1));

    return (
      <div>
        <Helmet title={currentTab.title} />
        <Jumbotron
          background={currentTab.picture}
          height="500px"
          title={currentTab.title}
        />

        <AppBar
          className={classes.tabsWrapper}
          color="default"
          elevation={0}
          position="static"
        >
          <Tabs
            classes={{
              flexContainer: classes.tabsFlexContainer,
            }}
            indicatorColor="primary"
            scrollButtons="off"
            textColor="primary"
            value={currentTab.slug}
            scrollable
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

export default Church;
