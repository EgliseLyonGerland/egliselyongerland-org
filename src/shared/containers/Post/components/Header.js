import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import format from 'date-fns/format';
import locale from 'date-fns/locale/fr';
import get from 'lodash/get';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

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
import createResponsiveButton from 'utils/createResponsiveButton.hoc';

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

  [theme.breakpoints.down('xs')]: {
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

  return `le ${format(date, 'D MMMM YYYY', { locale })}`;
};

const LinkButton = createResponsiveButton(
  { xxs: 'xxs', xs: 'xs' },
  'PostHeaderLinkButton',
);

@connect(
  ({ audio }) => ({ audio }),
  { openAudioAction: openAudio },
)
@withStyles(styles)
@withWidth()
@withRouter
class PostHeader extends Component {
  render() {
    const {
      post,
      width,
      audio,
      url,
      history,
      openAudioAction,
      classes,
    } = this.props;
    const imageUrl = get(
      post,
      'picture.sizes.large.url',
      '/images/placeholder.jpg',
    );
    const audioUrl = get(post, 'extras.audioUrl', null);

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
              <LinkButton
                key={category.slug}
                className={classes.link}
                color="white"
                onClick={() => {
                  history.push(routes.blog({ category: category.id }));
                }}
              >
                {category.name}
              </LinkButton>
            ))}

            {post.bibleRefs.slice(0, 1).map(ref => (
              <LinkButton
                key={ref.raw}
                className={classes.link}
                color="white"
                corners="rounded"
                onClick={() => {
                  history.push(
                    routes.blog({
                      book: ref.bookId,
                      chapter: ref.chapterStart,
                    }),
                  );
                }}
              >
                {ref.raw}
              </LinkButton>
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

              {__CLIENT__ && isWidthUp('sm', width) && (
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
  }
}

PostHeader.propTypes = {
  audio: PropTypes.shape().isRequired,
  classes: PropTypes.shape(),
  history: PropTypes.shape().isRequired,
  openAudioAction: PropTypes.func.isRequired,
  post: PropTypes.shape().isRequired,
  url: PropTypes.string.isRequired,
  width: PropTypes.string,
};

PostHeader.defaultProps = {
  classes: {},
  width: 'lg',
};

export default PostHeader;
