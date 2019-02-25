import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { TransitionMotion, spring, presets } from 'react-motion';
import { withStyles } from '@material-ui/core/styles';
import { renderRoutes } from 'react-router-config';
import classnames from 'classnames';

import { openSidebar, closeSidebar } from 'store/actions/sidebar';
// import {
//   closeAnnouncement,
//   openAnnouncement,
// } from 'store/actions/announcement';
import { closeAudio, pauseAudio } from 'store/actions/audio';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import Overlay from 'components/Overlay/Overlay';
import AudioPlayer from 'components/AudioPlayer/AudioPlayer';
import ScrollToTop from 'components/Scroll/ScrollToTop';
// import Announcement from 'components/Announcement/Announcement';

import config from 'config';

import 'url-search-params-polyfill';

import 'theme/bootstrap.scss';
import 'theme/base.scss';

const styles = theme => ({
  root: {
    paddingBottom: theme.footer.height + 55,
  },
  noScroll: {
    height: '100vh',
    overflow: 'hidden',
  },
  player: {
    position: 'fixed',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    zIndex: 1000,
    marginBottom: 30,
  },

  [theme.breakpoints.down('xs')]: {
    player: {
      marginBottom: 0,
    },
  },
});

const mapStateToProps = state => ({
  overlay: state.overlay,
  audio: state.audio,
  isSidebarOpened: state.sidebar.opened,
  // announcementOpened: state.announcement.opened,
  // announcementOpenCount: state.announcement.count,
});

const mapDispatchToProps = {
  openSidebarAction: openSidebar,
  closeSidebarAction: closeSidebar,
  closeAudioAction: closeAudio,
  pauseAudioAction: pauseAudio,
  // openAnnouncementAction: openAnnouncement,
  // closeAnnouncementAction: closeAnnouncement,
};

class App extends Component {
  // componentDidMount() {
  //   const { announcementOpenCount, openAnnouncementAction } = this.props;

  //   if (__CLIENT__ && announcementOpenCount === 0) {
  //     setTimeout(() => {
  //       openAnnouncementAction();
  //     }, 2000);
  //   }
  // }

  handleOverlayClicked() {
    const { closeSidebarAction } = this.props;

    closeSidebarAction();
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
                play={audio.playing}
                url={audio.url}
                withClose
                withShadows
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
      isSidebarOpened,
      openSidebarAction,
      closeSidebarAction,
      // announcementOpened,
      // closeAnnouncementAction,
      classes,
      route,
    } = this.props;

    return (
      <div
        className={classnames({
          [classes.root]: true,
          [classes.noScroll]: /* announcementOpened || */ isSidebarOpened,
        })}
      >
        <Helmet {...config.app.head} />
        <Overlay {...overlay} onClicked={() => this.handleOverlayClicked()} />
        <ScrollToTop />
        <Header
          sidebarOpened={isSidebarOpened}
          onCloseSidebarButtonClicked={() => closeSidebarAction()}
          onOpenSidebarButtonClicked={() => openSidebarAction()}
        />
        {/* {announcementOpened && (
          <Announcement
            onCloseButtonClicked={() => closeAnnouncementAction()}
          />
        )} */}
        {renderRoutes(route.routes)}
        <Footer />
        {this.renderAudio()}
      </div>
    );
  }
}

App.propTypes = {
  // closeAnnouncementAction: PropTypes.func.isRequired,
  closeSidebarAction: PropTypes.func.isRequired,
  isSidebarOpened: PropTypes.bool.isRequired,
  // openAnnouncementAction: PropTypes.func.isRequired,
  openSidebarAction: PropTypes.func.isRequired,
  overlay: PropTypes.shape().isRequired,
};

App.getInitialData = () => new Promise(resolve => setTimeout(resolve, 2000));

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(App),
);
