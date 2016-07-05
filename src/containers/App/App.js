import React, { Component, PropTypes } from 'react';

import Helmet from 'react-helmet';
import config from '../../config';
import { connect } from 'react-redux';
import * as searchbarActions from 'redux/modules/searchbar';
import * as sidebarActions from 'redux/modules/sidebar';

import { Header, Search, Overlay } from 'components';

@connect(
  state => ({
    overlay: state.overlay,
    isSearchbarOpened: state.searchbar.opened,
    isSidebarOpened: state.sidebar.opened,
  }),
  { ...searchbarActions, ...sidebarActions }
)
export default
class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    overlay: PropTypes.object.isRequired,
    isSearchbarOpened: PropTypes.bool.isRequired,
    openSearchbar: PropTypes.func.isRequired,
    closeSearchbar: PropTypes.func.isRequired,
    isSidebarOpened: PropTypes.bool.isRequired,
    openSidebar: PropTypes.func.isRequired,
    closeSidebar: PropTypes.func.isRequired,
  };

  handleOverlayClicked() {
    this.props.closeSearchbar();
    this.props.closeSidebar();
  }

  render() {
    const styles = require('./App.scss');

    const {
      overlay,
      isSearchbarOpened,
      isSidebarOpened,
      openSearchbar,
      closeSearchbar,
      openSidebar,
      closeSidebar } = this.props;

    return (
      <div className={styles.app}>
        <Helmet {...config.app.head}/>
        <Overlay {...overlay} onClicked={() => this.handleOverlayClicked()} />
        <Header
          sidebarOpened={isSidebarOpened}
          onSearchButtonClicked={() => openSearchbar()}
          onOpenSidebarButtonClicked={() => openSidebar()}
          onCloseSidebarButtonClicked={() => closeSidebar()} />
        <Search
          opened={isSearchbarOpened}
          hideButtonClicked={() => closeSearchbar()} />
        {this.props.children}
      </div>
    );
  }
}
