import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { TransitionMotion, spring, presets } from 'react-motion';
import { withStyles } from '@material-ui/core/styles';
import { renderRoutes } from 'react-router-config';

import * as searchbarActions from 'store/actions/searchbar';
import * as sidebarActions from 'store/actions/sidebar';
import { closeAudio, pauseAudio } from 'store/actions/audio';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import Overlay from 'components/Overlay/Overlay';
import AudioPlayer from 'components/AudioPlayer/AudioPlayer';
import ScrollToTop from 'components/Scroll/ScrollToTop';

import config from '../../config';

import 'url-search-params-polyfill';

import '../../theme/bootstrap.scss';
import '../../theme/base.scss';

const styles = {
  player: {
    position: 'fixed',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    zIndex: 1000,
    marginBottom: 30,
  },

  '@media screen and (max-width: 640px)': {
    player: {
      marginBottom: 0,
    },
  },
};

const mapStateToProps = state => ({
  overlay: state.overlay,
  audio: state.audio,
  // isSearchbarOpened: state.searchbar.opened,
  isSidebarOpened: state.sidebar.opened,
});

const mapDispatchToProps = {
  ...searchbarActions,
  ...sidebarActions,
  closeAudioAction: closeAudio,
  pauseAudioAction: pauseAudio,
};

class App extends Component {
  handleOverlayClicked() {
    const { closeSidebar } = this.props;

    // this.props.closeSearchbar();
    closeSidebar();
  }

  renderAudio() {
    const { audio, closeAudioAction, pauseAudioAction, classes } = this.props;

    const defaultStyles = [];

    if (audio.opened) {
      defaultStyles.push({
        key: 'audio-player',
        style: { bottom: spring(0, presets.stiff) },
      });
    }

    return (
      <TransitionMotion
        styles={defaultStyles}
        willEnter={() => ({ bottom: -200 })}
        willLeave={() => ({ bottom: spring(-200, presets.stiff) })}
      >
        {([interpolatedStyles]) =>
          interpolatedStyles ? (
            <div
              className={classes.player}
              style={{ bottom: interpolatedStyles.style.bottom }}
            >
              <AudioPlayer
                url={audio.url}
                play={audio.playing}
                withShadows
                withClose
                onClose={() => {
                  pauseAudioAction();
                  closeAudioAction();
                }}
              />
            </div>
          ) : null
        }
      </TransitionMotion>
    );
  }

  render() {
    const {
      overlay,
      // isSearchbarOpened,
      isSidebarOpened,
      openSearchbar,
      // closeSearchbar,
      openSidebar,
      closeSidebar,
      route,
    } = this.props;

    return (
      <div>
        <Helmet {...config.app.head} />
        <Overlay {...overlay} onClicked={() => this.handleOverlayClicked()} />
        <ScrollToTop />
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
        {renderRoutes(route.routes)}
        <Footer />
        {this.renderAudio()}
      </div>
    );
  }
}

App.propTypes = {
  // children: PropTypes.object.isRequired,
  overlay: PropTypes.shape().isRequired,
  // isSearchbarOpened: PropTypes.bool.isRequired,
  openSearchbar: PropTypes.func.isRequired,
  // closeSearchbar: PropTypes.func.isRequired,
  isSidebarOpened: PropTypes.bool.isRequired,
  openSidebar: PropTypes.func.isRequired,
  closeSidebar: PropTypes.func.isRequired,
};

App.getInitialData = () => new Promise(resolve => setTimeout(resolve, 2000));

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(App),
);
