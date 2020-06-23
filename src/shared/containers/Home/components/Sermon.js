import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { rem } from 'polished';
import { get } from 'lodash';
import classnames from 'classnames';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import differenceInDays from 'date-fns/difference_in_days';
import differenceInYears from 'date-fns/difference_in_years';
import locale from 'date-fns/locale/fr';

import Link from 'components/Link/Link';
import Image from 'components/Image/Image';
import ResponsiveText from 'components/Text/ResponsiveText';
import routes from 'utils/routes';

const styles = theme => ({
  root: {
    cursor: 'pointer',
  },
  picture: {
    transition: 'transform .5s',
  },
  headlines: {
    position: 'relative',
    background: theme.palette.background,
    padding: 24,
    maxWidth: 360,
    fontSize: rem(26),
    lineHeight: rem(34),
    marginTop: -56,
  },
  ref: {
    display: 'block',
    fontWeight: theme.typography.fontWeights.bold,
    fontSize: rem(16),
  },
  title: {
    fontWeight: theme.typography.fontWeights.regular,

    '& > span': {
      display: 'inline-block',
    },
  },
  extras: {
    position: 'relative',
    paddingLeft: 24,
    fontSize: rem(16),
    lineHeight: rem(20),
  },
  avatar: {
    float: 'left',
    width: rem(48),
    marginRight: 16,
    marginTop: rem(-4),
  },
  author: {
    fontWeight: theme.typography.fontWeights.medium,
  },
  date: {
    fontStyle: 'italic',
    fontWeight: theme.typography.fontWeights.regular,
  },
  duration: {
    color: theme.palette.text.secondary,

    '&:before': {
      content: "'•'",
      margin: [[0, 8]],
    },
  },
  [theme.mixins.withHover]: {
    picture: {},
    root: {
      '&:hover': {
        '& $picture': {
          transform: 'scale(1.1)',
        },
      },
    },
  },
  [theme.breakpoints.down('sm')]: {
    headlines: {
      padding: 16,
      maxWidth: 300,
      marginTop: -32,
      marginRight: 32,
      marginBottom: 8,
      fontSize: rem(22),
      lineHeight: rem(28),
    },
    extras: {
      paddingLeft: 16,
      fontSize: rem(14),
      lineHeight: rem(18),
    },
    avatar: {
      width: rem(40),
      marginRight: 8,
      marginTop: rem(-2),
    },
  },
});

@withStyles(styles)
class Sermon extends PureComponent {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
    className: PropTypes.string,
    data: PropTypes.shape({
      author: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
      categories: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
        }),
      ),
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    className: null,
  };

  render() {
    const { classes, className, data } = this.props;

    const title = data.title.replace(/([^ ]+ [^ ])$/, '<span>$1</span>');
    const authorId = get(data, ['author', 'id']);
    const authorName = get(data, ['author', 'name']);
    const authorPictureUrl = get(data, [
      'author',
      'picture',
      'sizes',
      'thumbnail',
      'url',
    ]);
    const imageUrl = get(data, ['picture', 'sizes', 'medium', 'url'], null);
    const audioDuration = get(data, ['extras', 'audio', 'duration']);
    const date = parse(get(data, ['extras', 'sermonDate'], data.date));
    const diffDays = differenceInDays(new Date(), date);
    const diffYears = differenceInYears(new Date(), date);

    let formattedDate = format(date, 'dddd D MMMM', { locale });
    let formattedDateShort = format(date, 'D MMM', { locale });

    if (diffDays <= 7) {
      formattedDate = 'dimanche dernier';
      formattedDateShort = 'dim. dernier';
    } else if (diffYears >= 1) {
      formattedDate = `${formattedDate} ${format(date, 'YYYY')}`;
      formattedDateShort = `${formattedDateShort} ${format(date, 'YY')}`;
    }

    const bookId = get(data, ['bibleRefs', 0, 'bookId']);
    const chapterStart = get(data, ['bibleRefs', 0, 'chapterStart']);

    return (
      <article className={classnames(classes.root, className)}>
        <NavLink to={routes.post(data.id)}>
          <Image
            classes={{ img: classes.picture }}
            ratio="16/9"
            src={imageUrl}
            title={data.title}
          />
        </NavLink>

        <div className={classes.headlines}>
          <div className={classes.ref}>
            <Link
              to={`${routes.blog({
                book: bookId,
                chapter: chapterStart,
              })}`}
            >
              {get(data, ['bibleRefs', 0, 'raw'])}
            </Link>
          </div>
          <Link
            className={classes.title}
            dangerouslySetInnerHTML={{ __html: title }}
            to={routes.post(data.id)}
          />
        </div>
        <div className={classes.extras}>
          <Image
            className={classes.avatar}
            src={authorPictureUrl}
            title={authorName}
            circular
          />
          <div className={classes.author}>
            <Link to={routes.blog({ author: authorId })}>{authorName}</Link>
          </div>
          <div className={classes.date}>
            <ResponsiveText xxs={`— ${formattedDateShort}`}>
              {`— ${formattedDate}`}
            </ResponsiveText>
            {audioDuration && (
              <span className={classes.duration}>
                {Math.floor(audioDuration / 60)} min
              </span>
            )}
          </div>
        </div>
      </article>
    );
  }
}

export default Sermon;
