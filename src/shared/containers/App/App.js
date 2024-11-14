import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { TransitionMotion, spring, presets } from 'react-motion';
import { withStyles } from '@material-ui/core/styles';
import { renderRoutes } from 'react-router-config';
import classnames from 'classnames';
import { asyncConnect } from 'redux-connect';

import { openSidebar, closeSidebar } from 'store/actions/sidebar';
import { closeAudio, pauseAudio } from 'store/actions/audio';
import { load as loadConfig } from 'store/actions/config';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import Overlay from 'components/Overlay/Overlay';
import AudioPlayer from 'components/AudioPlayer/AudioPlayer';
import ScrollToTop from 'components/Scroll/ScrollToTop';

import config from 'config';

import 'url-search-params-polyfill';

import 'theme/base.css';
import Announcement from './Announcement';

const styles = theme => ({
  root: {},
  noScroll: {
    height: '100vh',
    overflow: 'hidden',
  },
  content: {
    minHeight: `calc(100vh - ${theme.footer.height}px)`,
    paddingBottom: 80,

    '&:has(.no-bottom-padding)': {
      paddingBottom: 0,
    },
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

const asyncPromises = [
  {
    promise: ({ store: { dispatch, getState } }) => {
      if (getState().config.data) {
        return null;
      }

      const result = dispatch(loadConfig());

      return __CLIENT__ ? null : result;
    },
  },
];

const mapStateToProps = state => ({
  overlay: state.overlay,
  audio: state.audio,
  isSidebarOpened: state.sidebar.opened,
  isAnnouncementOpened: state.announcement.opened,
});

const mapDispatchToProps = {
  openSidebarAction: openSidebar,
  closeSidebarAction: closeSidebar,
  closeAudioAction: closeAudio,
  pauseAudioAction: pauseAudio,
};

function App({
  overlay,
  isSidebarOpened,
  openSidebarAction,
  closeSidebarAction,
  audio,
  closeAudioAction,
  pauseAudioAction,
  isAnnouncementOpened,
  classes,
  route,
  history,
}) {
  const isChristmasPage = useRef(history.location.pathname.includes('/noel'));

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
        [classes.noScroll]: isAnnouncementOpened || isSidebarOpened,
      })}
    >
      <Helmet {...config.app.head} />
      <Overlay {...overlay} onClicked={closeSidebarAction} />
      <ScrollToTop />
      <Header
        location={history.location}
        sidebarOpened={isSidebarOpened}
        onCloseSidebarButtonClicked={() => closeSidebarAction()}
        onOpenSidebarButtonClicked={() => openSidebarAction()}
      />
      {!isChristmasPage.current && <Announcement />}
      <div className={classes.content}>{renderRoutes(route.routes)}</div>
      <Footer />
      {renderAudio()}
    </div>
  );
}

App.propTypes = {
  closeSidebarAction: PropTypes.func.isRequired,
  isSidebarOpened: PropTypes.bool.isRequired,
  openSidebarAction: PropTypes.func.isRequired,
  isAnnouncementOpened: PropTypes.bool.isRequired,
  overlay: PropTypes.shape().isRequired,
};

App.getInitialData = () => new Promise(resolve => setTimeout(resolve, 2000));

export default asyncConnect(asyncPromises)(
  withStyles(styles)(
    connect(
      mapStateToProps,
      mapDispatchToProps,
    )(App),
  ),
);
