import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import range from 'lodash/range';
import classnames from 'classnames';

import Button from 'components/Button/Button';

const headings = range(1, 6)
  .map(level => `& > h${level}`)
  .join(',');

const styles = theme => ({
  root: {
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
      marginTop: 100,
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

  [theme.breakpoints.down('xs')]: {
    root: {
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
  },
});

class PostContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      full: props.content.length < 200,
    };
  }

  render() {
    const { content, classes } = this.props;
    const { full } = this.state;

    return (
      <div>
        <div
          className={classnames(classes.root, { full })}
          dangerouslySetInnerHTML={{ __html: content }}
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
      </div>
    );
  }
}

PostContent.propTypes = {
  classes: PropTypes.shape().isRequired,
  content: PropTypes.string.isRequired,
};

export default withStyles(styles)(PostContent);
