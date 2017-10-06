import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui";
import IconButton from "material-ui/IconButton";
import PlayArrowIcon from "material-ui-icons/PlayArrow";
import PauseIcon from "material-ui-icons/Pause";
import CloseIcon from "material-ui-icons/Close";
import ReplayIcon from "material-ui-icons/Replay";
import { CircularProgress } from "material-ui/Progress";
import { padStart, noop } from "lodash";
import classnames from "classnames";

import ProgressBar from "./ProgressBar";

const SPINNER_SIZE = 24;

const prettyDuration = (duration, max = 0) => {
  const hours = Math.floor(duration / 3600);
  const minutes = padStart(Math.floor(duration / 60), 2, "0");
  const seconds = padStart(Math.floor(duration % 60), 2, "0");

  if (hours || max >= 3600) {
    return `${hours}:${minutes}:${seconds}`;
  }

  return `${minutes}:${seconds}`;
};

const styles = theme => ({
  root: {
    position: "relative",
    maxWidth: 450,
    width: "100%"
  },
  inner: {
    height: 60,
    ...theme.gradient(),
    borderRadius: 60,
    display: "flex",
    alignItems: "center",
    padding: [[0, 20]],
    color: "white"
  },
  controls: {
    display: "flex",
    alignItems: "center",
    flex: 1
  },
  disabled: {
    opacity: 0.3
  },
  shadows: {
    boxShadow: "2px 2px 4px rgba(0,0,0,0.3)"
  },
  seek: {
    flex: 1,
    margin: [[0, 20, 0, 10]]
  },
  time: {
    marginRight: 15
  },
  current: {
    fontWeight: 400,
    marginRight: 10
  },
  total: {
    opacity: 0.6
  },
  spinner: {
    position: "absolute",
    top: "50%",
    left: "50%",
    margin: [[-SPINNER_SIZE / 2, 0, 0, -SPINNER_SIZE / 2]]
  },
  error: {
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    marginTop: -11,
    textAlign: "center",

    "& span": {
      display: "inline-block",
      background: "red",
      color: "white",
      fontSize: 14,
      fontWeight: 700,
      lineHeight: "22px",
      padding: [[0, 10]],
      borderRadius: 3
    }
  },

  "@media screen and (max-width: 640px)": {
    root: {
      maxWidth: "none"
    },
    inner: {
      borderRadius: 0,
      padding: [[0, 5]]
    }
  }
});

class AudioPlayer extends Component {
  static propTypes = {
    url: PropTypes.string,
    play: PropTypes.bool,
    withShadows: PropTypes.bool,
    withClose: PropTypes.bool,
    onClose: PropTypes.func,
    onPlay: PropTypes.func,
    onPause: PropTypes.func
  };

  static defaultProps = {
    url: null,
    play: false,
    withShadows: false,
    withClose: false,
    onClose: noop,
    onPlay: noop,
    onPause: noop
  };

  constructor(props) {
    super(props);

    this.state = this.getDefaultState();

    this.handleLoadStart = this.handleLoadStart.bind(this);
    this.handleCanPlay = this.handleCanPlay.bind(this);
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
    this.handleSeek = this.handleSeek.bind(this);
  }

  componentDidMount() {
    this.player.addEventListener("loadstart", this.handleLoadStart, false);
    this.player.addEventListener("canplay", this.handleCanPlay, false);
    this.player.addEventListener("timeupdate", this.handleTimeUpdate, false);
    this.player.addEventListener("error", this.handleError, false);
    this.player.addEventListener("stalled", this.handleError, false);
    this.player.addEventListener("play", this.handlePlay, false);
    this.player.addEventListener("playing", this.handlePlay, false);
    this.player.addEventListener("pause", this.handlePause, false);
    this.player.addEventListener("ended", this.handleEnd, false);
    this.player.addEventListener("seeked", this.handleSeek, false);
    this.player.addEventListener("seeking", this.handleSeek, false);

    this.update(this.props, true);
  }

  componentWillReceiveProps(nextProps) {
    this.update(nextProps);
  }

  componentWillUnmount() {
    this.player.removeEventListener("loadstart", this.handleLoadStart);
    this.player.removeEventListener("canplay", this.handleCanPlay);
    this.player.removeEventListener("timeupdate", this.handleTimeUpdate);
    this.player.removeEventListener("error", this.handleError);
    this.player.removeEventListener("stalled", this.handleError);
    this.player.removeEventListener("play", this.handlePlay);
    this.player.removeEventListener("playing", this.handlePlay);
    this.player.removeEventListener("pause", this.handlePause);
    this.player.removeEventListener("ended", this.handleEnd);
    this.player.removeEventListener("seeked", this.handleSeek);
    this.player.removeEventListener("seeking", this.handleSeek);
  }

  getDefaultState() {
    return {
      disabled: true,
      loading: false,
      playing: false,
      dragging: false,
      ended: false,
      currentTime: null,
      duration: null,
      error: false
    };
  }

  handleLoadStart() {
    this.setState({
      ...this.getDefaultState(),
      loading: true
    });
  }

  handleCanPlay() {
    const { play } = this.props;
    const { player: { currentTime, duration } } = this;

    this.setState(
      {
        loading: false,
        disabled: false,
        currentTime,
        duration
      },
      () => {
        play ? this.play() : this.pause();
      }
    );
  }

  handleTimeUpdate() {
    if (this.state.dragging) {
      return;
    }

    this.setState({ currentTime: this.player.currentTime });
  }

  handleError() {
    this.setState({
      ...this.getDefaultState(),
      error: true
    });
  }

  handlePlay() {
    this.setState({
      disabled: false,
      playing: true
    });
  }

  handlePause() {
    this.setState({
      disabled: false,
      playing: false
    });
  }

  handleEnd() {
    this.setState({
      playing: false,
      ended: true
    });
  }

  handleDragStart() {
    this.setState({ dragging: true });
  }

  handleDragStop() {
    this.setState({ dragging: false }, () => {
      this.seekTo(this.state.currentTime);
    });
  }

  handleChange(time) {
    const { dragging } = this.state;

    if (dragging) {
      this.setState({ currentTime: time });
    } else {
      this.seekTo(time);
    }
  }

  handleSeek() {
    this.setState({ currentTime: this.player.currentTime });
  }

  update(props, init = false) {
    const currentUrl = init ? null : this.props.url;
    const currentPlay = init ? null : this.props.play;

    if (props.url !== currentUrl) {
      if (!props.url) {
        this.reset();
        return;
      }

      this.player.src = props.url;
      this.player.load();
      return;
    }

    if (props.play !== this.state.playing) {
      props.play ? this.play() : this.pause();
    }
  }

  reset() {
    this.setState(this.getDefaultState());
  }

  play() {
    this.player.play().catch(noop);
  }

  pause() {
    this.player.pause();
  }

  seekTo(time) {
    this.player.currentTime = Math.floor(time);
  }

  renderClose() {
    const { withClose, onClose } = this.props;

    if (!withClose) {
      return null;
    }

    return (
      <div>
        <IconButton color="contrast" onClick={() => onClose()}>
          <CloseIcon style={{ width: 24, height: 24 }} />
        </IconButton>
      </div>
    );
  }

  renderPlayingIcon() {
    const { onPause, onPlay } = this.props;
    const { playing, ended } = this.state;

    if (ended) {
      return (
        <ReplayIcon
          style={{ width: 30, height: 30 }}
          onClick={() => this.seekTo(0)}
        />
      );
    }

    if (playing) {
      return (
        <PauseIcon
          style={{ width: 36, height: 36 }}
          onClick={() => onPause()}
        />
      );
    }

    return (
      <PlayArrowIcon
        style={{ width: 36, height: 36 }}
        onClick={() => onPlay()}
      />
    );
  }

  renderControls() {
    const { classes } = this.props;
    const { currentTime, duration, disabled } = this.state;

    return (
      <div
        className={classnames(classes.controls, {
          [classes.disabled]: disabled
        })}
      >
        <div>
          <IconButton color="contrast" disabled={disabled}>
            {this.renderPlayingIcon()}
          </IconButton>
        </div>
        <div className={classes.seek}>
          <ProgressBar
            min={0}
            max={duration || 1}
            value={currentTime || 0}
            onChange={(event, value) => this.handleChange(value)}
            onDragStart={() => this.handleDragStart()}
            onDragStop={() => this.handleDragStop()}
          />
        </div>
        <div className={classes.time}>
          <span className={classes.current}>
            {prettyDuration(currentTime, duration)}
          </span>
          <span className={classes.total}>{prettyDuration(duration)}</span>
        </div>
      </div>
    );
  }

  renderInner() {
    const { classes, withShadows } = this.props;

    return (
      <div
        className={classnames(classes.inner, {
          [classes.shadows]: withShadows
        })}
      >
        {this.renderControls()}
        {this.renderClose()}
      </div>
    );
  }

  render() {
    const { classes, url } = this.props;
    const { loading, error } = this.state;

    return (
      <div className={classes.root}>
        <audio ref={node => (this.player = node)} preload="auto" />

        {this.renderInner()}

        {loading && (
          <CircularProgress
            className={classes.spinner}
            size={SPINNER_SIZE}
            color="accent"
          />
        )}

        {error && (
          <div className={classes.error}>
            <span>Erreur: impossible de lire le média</span>
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(AudioPlayer);
