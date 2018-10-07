import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { get } from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Icon from '@material-ui/core/Icon';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

import { openAudio } from 'store/actions/audio';
import Jumbotron from 'components/Jumbotron/Jumbotron';
import FacebookIcon from 'components/Icon/FacebookIcon';
import TwitterIcon from 'components/Icon/TwitterIcon';
import Button from 'components/Button/Button';
import FacebookShare from 'components/Share/FacebookShare';
import TwitterShare from 'components/Share/TwitterShare';

import routes from 'utils/routes';

const styles = theme => ({
  root: {
    background: 'center center',
    backgroundSize: 'cover',
    minHeight: 700,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    color: 'rgba(255,255,255,0.95)',
    textAlign: 'center',
    maxWidth: 790,
    padding: [[0, 20]],
  },
  separator: {
    ...theme.gradient(),
    width: 260,
    height: 1,
    margin: [[30, 'auto']],
  },
  baseline: {
    fontSize: 22,
    marginBottom: 30,
  },
  author: {
    fontWeight: theme.typography.fontWeights.regular,
  },
  dash: {
    margin: [[0, 10]],
  },
  links: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  link: {
    margin: [[0, 8, 20]],
  },
  audioActions: {
    marginTop: 60,
  },
  audioAction: {
    margin: [[0, 10]],
  },
  audioActionLabel: {
    display: 'block',
    width: 130,
    fontWeight: theme.typography.fontWeights.regular,
  },

  '@media screen and (max-width: 640px), screen and (max-height: 640px)': {
    separator: {
      width: 140,
      margin: [[20, 'auto']],
    },
    baseline: {
      fontSize: 18,
    },
    link: {
      margin: [[0, 5, 20]],
    },
    audioActions: {
      marginTop: 30,
    },
  },
});

const renderDate = post => {
  const date = get(post, ['extras', 'sermonDate'], post.date);

  return `le ${moment(date).format('D MMMM YYYY')}`;
};

const Header = ({
  post,
  browser,
  audio,
  url,
  history,
  openAudioAction,
  classes,
}) => {
  const imageUrl = get(
    post,
    'picture.sizes.large.url',
    '/images/placeholder.jpg',
  );
  const audioUrl = get(post, 'extras.audioUrl', null);

  const buttonSize = browser.width <= 640 ? 'xxs' : 'xs';

  return (
    <Jumbotron background={imageUrl} title={post.title}>
      <div className={classes.inner}>
        <div className={classes.separator} />
        <div className={classes.baseline}>
          Par <span className={classes.author}>{post.author.name}</span>
          <span className={classes.dash}> — </span>
          <span style={{ display: 'inline-block' }}>{renderDate(post)}</span>
        </div>
        <div className={classes.links}>
          {post.categories.slice(0, 1).map(category => (
            <Button
              key={category.slug}
              className={classes.link}
              color="white"
              size={buttonSize}
              onClick={() => {
                history.push(routes.blog({ category: category.id }));
              }}
            >
              {category.name}
            </Button>
          ))}

          {post.bibleRefs.slice(0, 1).map(ref => (
            <Button
              key={ref.raw}
              className={classes.link}
              color="white"
              corners="rounded"
              size={buttonSize}
              onClick={() => {
                history.push(
                  routes.blog({ book: ref.bookId, chapter: ref.chapterStart }),
                );
              }}
            >
              {ref.raw}
            </Button>
          ))}

          <FacebookShare url={url}>
            <Button
              aria-label="Facebook"
              className={classes.link}
              color="white"
              mode="ghost"
              type="icon"
            >
              <FacebookIcon />
            </Button>
          </FacebookShare>

          <TwitterShare text={post.title} url={url}>
            <Button
              aria-label="Twitter"
              className={classes.link}
              color="white"
              mode="ghost"
              type="icon"
            >
              <TwitterIcon />
            </Button>
          </TwitterShare>
        </div>

        {audioUrl && (
          <div className={classes.audioActions}>
            <Button
              className={classes.audioAction}
              color="primary"
              corners="circular"
              disabled={audio.url === audioUrl}
              mode="plain"
              onClick={() => openAudioAction(audioUrl, true)}
            >
              <Icon>
                <PlayArrowIcon />
              </Icon>
              <span className={classes.audioActionLabel}>
                {audio.url === audioUrl ? "A l'écoute" : 'Écouter'}
              </span>
            </Button>

            {browser.greaterThan.md && (
              <Button
                className={classes.audioAction}
                color="white"
                corners="circular"
                size="md"
                onClick={() => window.open(audioUrl)}
              >
                <Icon>
                  <CloudDownloadIcon />
                </Icon>
                <span className={classes.audioActionLabel}>Télécharger</span>
              </Button>
            )}
          </div>
        )}
      </div>
    </Jumbotron>
  );
};

Header.propTypes = {
  audio: PropTypes.shape().isRequired,
  browser: PropTypes.shape().isRequired,
  classes: PropTypes.shape().isRequired,
  history: PropTypes.shape().isRequired,
  openAudioAction: PropTypes.func.isRequired,
  post: PropTypes.shape().isRequired,
  url: PropTypes.string.isRequired,
};

export default connect(
  ({ browser, audio }) => ({ browser, audio }),
  {
    openAudioAction: openAudio,
  },
)(withRouter(withStyles(styles)(Header)));