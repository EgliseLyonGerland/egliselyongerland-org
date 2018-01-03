import React from "react";
import { withStyles } from "material-ui/styles";
import moment from "moment";
import { get } from "lodash";
import { connect } from "react-redux";
import { push } from "react-router-redux";

import Icon from "material-ui/Icon";
import IconButton from "material-ui/IconButton";
import PlayArrowIcon from "material-ui-icons/PlayArrow";
import CloudDownloadIcon from "material-ui-icons/CloudDownload";

import { openAudio } from "redux/actions/audio";
import Jumbotron from "components/Jumbotron/Jumbotron";
import FacebookIcon from "components/Icon/FacebookIcon";
import TwitterIcon from "components/Icon/TwitterIcon";
import Button from "components/Button/ButtonReloaded";
import FacebookShare from "components/Share/FacebookShare";
import TwitterShare from "components/Share/TwitterShare";

import routes from "utils/routes";

const styles = theme => ({
  root: {
    background: "center center",
    backgroundSize: "cover",
    minHeight: 700,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  inner: {
    color: "rgba(255,255,255,0.95)",
    textAlign: "center",
    maxWidth: 790,
    padding: [[0, 20]]
  },
  separator: {
    ...theme.gradient(),
    width: 260,
    height: 1,
    margin: [[30, "auto"]]
  },
  baseline: {
    fontSize: 22,
    marginBottom: 30
  },
  author: {
    fontWeight: 400
  },
  dash: {
    margin: [[0, 10]]
  },
  links: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap"
  },
  link: {
    margin: [[0, 10, 20]]
  },
  shares: {
    margin: [[0, 0, 20]]
  },
  audioActions: {
    marginTop: 60
  },
  audioAction: {
    margin: [[0, 10]]
  },
  audioActionLabel: {
    display: "block",
    width: 130,
    fontWeight: 400
  },

  "@media screen and (max-width: 640px), screen and (max-height: 640px)": {
    separator: {
      width: 140,
      margin: [[20, "auto"]]
    },
    baseline: {
      fontSize: 18
    },
    link: {
      margin: [[0, 5, 20]]
    },
    audioActions: {
      marginTop: 30
    }
  }
});

const renderDate = post => {
  const date = get(post, ["extras", "sermonDate"], post.date);

  return `le ${moment(date).format("D MMMM YYYY")}`;
};

const Header = ({ post, browser, audio, url, push, openAudio, classes }) => {
  const imageUrl = get(
    post,
    "picture.sizes.large.url",
    "/images/placeholder.jpg"
  );
  const audioUrl = get(post, "extras.audioUrl", null);

  const buttonSize = browser.width <= 640 ? "xxs" : "xs";

  return (
    <Jumbotron background={imageUrl} title={post.title}>
      <div className={classes.inner}>
        <div className={classes.separator} />
        <div className={classes.baseline}>
          Par <span className={classes.author}>{post.author.name}</span>
          <span className={classes.dash}>{" — "}</span>
          <span style={{ display: "inline-block" }}>{renderDate(post)}</span>
        </div>
        <div className={classes.links}>
          {post.categories.slice(0, 1).map(category => (
            <Button
              key={category.slug}
              onClick={() => {
                push(routes.blog({ category: category.id }));
              }}
              className={classes.link}
              color="contrast"
              corners="rounded"
              size={buttonSize}
              bordered
            >
              {category.name}
            </Button>
          ))}

          {post.bibleRefs.slice(0, 1).map(ref => (
            <Button
              key={ref.raw}
              onClick={() => {
                push(
                  routes.blog({ book: ref.bookId, chapter: ref.chapterStart })
                );
              }}
              className={classes.link}
              color="contrast"
              corners="rounded"
              bordered
              size={buttonSize}
            >
              {ref.raw}
            </Button>
          ))}

          <div className={classes.shares}>
            <FacebookShare url={url}>
              <IconButton color="contrast" aria-label="Facebook">
                <FacebookIcon />
              </IconButton>
            </FacebookShare>

            <TwitterShare url={url} text={post.title}>
              <IconButton color="contrast" aria-label="Twitter">
                <TwitterIcon />
              </IconButton>
            </TwitterShare>
          </div>
        </div>

        {audioUrl && (
          <div className={classes.audioActions}>
            <Button
              onClick={() => openAudio(audioUrl, true)}
              className={classes.audioAction}
              color="primary"
              corners="circled"
              raised
              size="md"
              disabled={audio.url === audioUrl}
            >
              <Icon>
                <PlayArrowIcon />
              </Icon>
              <span className={classes.audioActionLabel}>
                {audio.url === audioUrl ? "A l'écoute" : "Écouter"}
              </span>
            </Button>

            {browser.greaterThan.md && (
              <Button
                onClick={() => window.open(audioUrl)}
                className={classes.audioAction}
                color="contrast"
                corners="circled"
                bordered
                size="md"
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

export default connect(({ browser, audio }) => ({ browser, audio }), {
  push,
  openAudio
})(withStyles(styles)(Header));
