import React, { Component } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { TransitionMotion, spring, presets } from "react-motion";
import { withStyles } from "material-ui";

import * as searchbarActions from "redux/actions/searchbar";
import * as sidebarActions from "redux/actions/sidebar";
import { closeAudio, playAudio, pauseAudio } from "redux/actions/audio";
import { Header, Footer /* , Search */, Overlay } from "components";
import AudioPlayer from "components/AudioPlayer/AudioPlayer";

import config from "../../config";

const styles = {
  player: {
    position: "fixed",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    zIndex: 1000,
    marginBottom: 30
  },

  "@media screen and (max-width: 640px)": {
    player: {
      marginBottom: 0
    }
  }
};

@connect(
  state => ({
    overlay: state.overlay,
    audio: state.audio,
    // isSearchbarOpened: state.searchbar.opened,
    isSidebarOpened: state.sidebar.opened
  }),
  { ...searchbarActions, ...sidebarActions, closeAudio, playAudio, pauseAudio }
)
@withStyles(styles)
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    overlay: PropTypes.object.isRequired,
    // isSearchbarOpened: PropTypes.bool.isRequired,
    openSearchbar: PropTypes.func.isRequired,
    // closeSearchbar: PropTypes.func.isRequired,
    isSidebarOpened: PropTypes.bool.isRequired,
    openSidebar: PropTypes.func.isRequired,
    closeSidebar: PropTypes.func.isRequired
  };

  handleOverlayClicked() {
    // this.props.closeSearchbar();
    this.props.closeSidebar();
  }

  renderAudio() {
    const { audio, closeAudio, playAudio, pauseAudio, classes } = this.props;

    let styles = [];

    if (audio.opened) {
      styles.push({
        key: "audio-player",
        style: { bottom: spring(0, presets.stiff) }
      });
    }

    return (
      <TransitionMotion
        styles={styles}
        willEnter={() => ({ bottom: -200 })}
        willLeave={() => ({ bottom: spring(-200, presets.stiff) })}
      >
        {([config]) =>
          config ? (
            <div
              className={classes.player}
              style={{ bottom: config.style.bottom }}
            >
              <AudioPlayer
                url={audio.url}
                play={audio.playing}
                withShadows
                withClose
                onClose={() => {
                  pauseAudio();
                  closeAudio();
                }}
                onPlay={() => playAudio()}
                onPause={() => pauseAudio()}
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
      closeSidebar
    } = this.props;

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

        {this.renderAudio()}
      </div>
    );
  }
}
