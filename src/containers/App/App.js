import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import * as searchbarActions from 'redux/modules/searchbar';
import * as sidebarActions from 'redux/modules/sidebar';

import { Header, Footer /* , Search */, Overlay } from 'components';

import config from '../../config';

import './App.scss';

@connect(
  state => ({
    overlay: state.overlay,
    // isSearchbarOpened: state.searchbar.opened,
    isSidebarOpened: state.sidebar.opened,
  }),
  { ...searchbarActions, ...sidebarActions }
)
export default
class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    overlay: PropTypes.object.isRequired,
    // isSearchbarOpened: PropTypes.bool.isRequired,
    openSearchbar: PropTypes.func.isRequired,
    // closeSearchbar: PropTypes.func.isRequired,
    isSidebarOpened: PropTypes.bool.isRequired,
    openSidebar: PropTypes.func.isRequired,
    closeSidebar: PropTypes.func.isRequired,
  };

  handleOverlayClicked() {
    // this.props.closeSearchbar();
    this.props.closeSidebar();
  }

  render() {
    const {
      overlay,
      // isSearchbarOpened,
      isSidebarOpened,
      openSearchbar,
      // closeSearchbar,
      openSidebar,
      closeSidebar } = this.props;

    return (
      <div>
        <Helmet {...config.app.head} />
        <Overlay {...overlay} onClicked={() => this.handleOverlayClicked()} />
        <Header
          sidebarOpened={isSidebarOpened}
          onSearchButtonClicked={() => openSearchbar()}
          onOpenSidebarButtonClicked={() => openSidebar()}
          onCloseSidebarButtonClicked={() => closeSidebar()}
        />
        {/* <Search
          opened={isSearchbarOpened}
          hideButtonClicked={() => closeSearchbar()}
        /> */}
        {this.props.children}

        <Footer />
      </div>
    );
  }
}
