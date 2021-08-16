import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { TransitionMotion, spring, presets } from 'react-motion';
import { withStyles } from '@material-ui/core/styles';
import { renderRoutes } from 'react-router-config';
import classnames from 'classnames';
import useLocalStorage from 'react-use-localstorage';
import { isBefore } from 'date-fns';

import { openSidebar, closeSidebar } from 'store/actions/sidebar';
import {
  closeAnnouncement,
  openAnnouncement,
} from 'store/actions/announcement';
import { closeAudio, pauseAudio } from 'store/actions/audio';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import Overlay from 'components/Overlay/Overlay';
import AudioPlayer from 'components/AudioPlayer/AudioPlayer';
import ScrollToTop from 'components/Scroll/ScrollToTop';
import Announcement from 'components/Announcement/Announcement';

import config from 'config';

import 'url-search-params-polyfill';

import 'theme/base.css';

const styles = theme => ({
  root: {},
  noScroll: {
    height: '100vh',
    overflow: 'hidden',
  },
  content: {
    minHeight: `calc(100vh - ${theme.footer.height}px)`,
    paddingBottom: 80,
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
    content: {
      paddingBottom: 40,
    },
  },
});

const mapStateToProps = state => ({
  overlay: state.overlay,
  audio: state.audio,
  isSidebarOpened: state.sidebar.opened,
  announcementOpened: state.announcement.opened,
  announcementOpenCount: state.announcement.count,
});

const mapDispatchToProps = {
  openSidebarAction: openSidebar,
  closeSidebarAction: closeSidebar,
  closeAudioAction: closeAudio,
  pauseAudioAction: pauseAudio,
  openAnnouncementAction: openAnnouncement,
  closeAnnouncementAction: closeAnnouncement,
};

function App({
  overlay,
  isSidebarOpened,
  openSidebarAction,
  closeSidebarAction,
  announcementOpened,
  announcementOpenCount,
  openAnnouncementAction,
  closeAnnouncementAction,
  audio,
  closeAudioAction,
  pauseAudioAction,
  classes,
  route,
}) {
  let displayAnnouncement = false;
  let setDisplayAnnouncement = null;

  if (__CLIENT__) {
    if (localStorage) {
      localStorage.removeItem('displayAnnouncement');
      localStorage.removeItem('displayAnnouncement2');
      localStorage.removeItem('displayAnnouncement3');
      localStorage.removeItem('displayAnnouncement4');
      localStorage.removeItem('displayAnnouncement5');
      localStorage.removeItem('displayAnnouncement6');
      localStorage.removeItem('displayAnnouncement7');
      localStorage.removeItem('displayAnnouncement8');
    }

    [displayAnnouncement, setDisplayAnnouncement] = useLocalStorage(
      'displayAnnouncement9',
      1,
    );
  }

  useEffect(() => {
    if (
      !__CLIENT__ ||
      displayAnnouncement === '0' ||
      announcementOpenCount !== 0 ||
      isBefore(new Date(), new Date(2021, 5, 23))
    ) {
      return;
    }

    setTimeout(() => {
      openAnnouncementAction();
    }, 5000);
  }, []);

  function renderAudio() {
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

  return (
    <div
      className={classnames({
        [classes.root]: true,
        [classes.noScroll]: announcementOpened || isSidebarOpened,
      })}
    >
      <Helmet {...config.app.head} />
      <Overlay {...overlay} onClicked={closeSidebarAction} />
      <ScrollToTop />
      <Header
        sidebarOpened={isSidebarOpened}
        onCloseSidebarButtonClicked={() => closeSidebarAction()}
        onOpenSidebarButtonClicked={() => openSidebarAction()}
      />
      {announcementOpened && (
        <Announcement
          onCloseButtonClicked={remind => {
            setDisplayAnnouncement(remind + 0);
            closeAnnouncementAction();
          }}
        />
      )}
      <div className={classes.content}>{renderRoutes(route.routes)}</div>
      <Footer />
      {renderAudio()}
    </div>
  );
}

App.propTypes = {
  closeAnnouncementAction: PropTypes.func.isRequired,
  closeSidebarAction: PropTypes.func.isRequired,
  isSidebarOpened: PropTypes.bool.isRequired,
  openAnnouncementAction: PropTypes.func.isRequired,
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
