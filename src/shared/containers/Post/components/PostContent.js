import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import range from 'lodash/range';
import get from 'lodash/get';
import classnames from 'classnames';
import { findVideoId } from 'utils/youtube';

import Button from 'components/Button/Button';
import NoTranscription from './NoTranscription';

const headings = range(1, 6)
  .map(level => `& > h${level}`)
  .join(',');

const styles = theme => ({
  content: {
    fontSize: '1.1rem',
    fontWeight: theme.typography.fontWeights.regular,
    lineHeight: '1.5',
    color: '#333',
    padding: [[0, 40]],
    height: 800,
    overflowY: 'hidden',
    position: 'relative',

    '&:after': {
      content: "''",
      display: 'block',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 100,
      background:
        'linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)',
    },

    '&.full': {
      height: 'auto',
      overflowY: 'inherit',

      '&:after': {
        display: 'none',
      },
    },

    '& > *:first-child': {
      marginTop: 80,
    },

    '& > p': {
      maxWidth: 630,
      margin: [[32, 'auto']],
    },

    [headings]: {
      display: 'block',
      maxWidth: 350,
      margin: [[100, 'auto', 50]],
      fontSize: 30,
      textAlign: 'center',
      color: theme.palette.primary[500],

      '&:after': {
        content: "''",
        display: 'block',
        ...theme.gradient(),
        width: 140,
        height: 1,
        margin: [[30, 'auto', 0]],
      },
    },

    '& > blockquote': {
      fontWeight: theme.typography.fontWeights.regular,
      fontStyle: 'italic',
      color: '#555',
      maxWidth: 780,
      margin: [[90, 'auto']],
      fontSize: 30,
      lineHeight: '48px',
      textAlign: 'center',
    },

    '& > p > img': {
      margin: [[0, -40]],
      width: 710,
      height: 'auto',
      maxWidth: '100vw',
    },
  },
  more: {
    marginTop: 50,
    textAlign: 'center',
  },
  video: {
    maxWidth: 900,
    margin: [[80, 'auto', 0]],
    padding: [[0, 40]],
  },
  videoInner: {
    overflow: 'hidden',
    paddingBottom: '56.25%',
    position: 'relative',
    height: 0,

    '& iframe': {
      left: 0,
      top: 0,
      height: '100%',
      width: '100%',
      position: 'absolute',
    },
  },

  [theme.breakpoints.down('xs')]: {
    content: {
      padding: [[0, 20]],

      '& > *:first-child': {
        marginTop: 50,
      },

      [headings]: {
        margin: [[50, 'auto', 30]],
        fontSize: 24,

        '&:after': {
          width: 110,
          margin: [[20, 'auto', 0]],
        },
      },

      '& > blockquote': {
        margin: [[50, 'auto']],
        fontSize: 20,
        lineHeight: '28px',
      },

      '& > p > img': {
        margin: [[0, -20]],
      },
    },
    video: {
      marginTop: 40,
      padding: [[0, 24]],
    },
  },
});

class PostContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      full: props.post.content.length < 200,
    };
  }

  renderYoutubeVideo() {
    const {
      post: { title, extras },
      classes,
    } = this.props;

    if (!extras.youtubeUrl) {
      return null;
    }

    try {
      const videoId = findVideoId(extras.youtubeUrl);

      return (
        <div className={classes.video}>
          <div className={classes.videoInner}>
            <iframe
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              frameBorder="0"
              height="315"
              src={`https://www.youtube.com/embed/${videoId}`}
              title={title}
              width="560"
            />
          </div>
        </div>
      );
    } catch (err) {
      return null;
    }
  }

  render() {
    const { post, classes } = this.props;
    const { full } = this.state;
    const noTranscription =
      post.content === '' && get(post, 'extras.audio.url', null);

    return (
      <div>
        {this.renderYoutubeVideo()}

        {noTranscription ? (
          <NoTranscription />
        ) : (
          <>
            <div
              className={classnames(classes.content, { full })}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            {!full && (
              <div className={classes.more}>
                <Button
                  color="primary"
                  onClick={() => this.setState({ full: true })}
                >
                  Lire la suite
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    );
  }
}

PostContent.propTypes = {
  classes: PropTypes.shape().isRequired,
  post: PropTypes.shape({
    content: PropTypes.string.isRequired,
    extras: PropTypes.shape({
      youtubeUrl: PropTypes.string,
    }).isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(PostContent);
