import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { rem } from 'polished';
import { Parallax } from 'react-scroll-parallax';
import classnames from 'classnames';

import Container from 'components/Container/Container';
import Image from 'components/Image/Image';
import RevealQueue from 'components/Animation/RevealQueue';

const styles = ({ typography, palette, breakpoints }) => ({
  root: {
    position: 'relative',
  },
  inverted: {},
  first: {},
  last: {},
  title: {
    display: 'block',
    fontSize: rem(32),
    fontWeight: typography.fontWeights.regular,
    color: palette.primary[500],
    textAlign: 'left',
    marginBottom: 32,

    '&::after': {
      content: '""',
      display: 'block',
      width: 90,
      height: 1,
      backgroundColor: palette.primary[500],
      margin: [[24, 0, 0]],
    },
  },
  backgroundWrapper: {},
  background: {
    background: '#F7F7F7',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  inner: {
    display: 'flex',
    margin: [[80, 0]],

    '$inverted &': {
      flexDirection: 'row-reverse',
    },

    '$first &': {
      marginTop: 0,
    },

    '$last &': {
      marginBottom: 0,
    },
  },
  pictureWrapper: {
    width: 372,
    flexShrink: 0,
    marginRight: 40,

    '$inverted &': {
      marginRight: 0,
      marginLeft: 40,
    },
  },
  [breakpoints.down('xs')]: {
    inverted: {},
    inner: {
      flexDirection: 'column',
      margin: [[32, 0]],

      '$inverted &': {
        flexDirection: 'column',
      },
    },
    pictureWrapper: {
      width: '100%',
      maxWidth: 460,
      margin: 0,

      '$inverted &': {
        marginLeft: 0,
      },
    },
    textWrapper: {
      position: 'relative',
      padding: 32,
      marginTop: -100,
      zIndex: 1,
    },
    title: {
      fontSize: rem(24),
      background: 'white',
      padding: 32,
      margin: [[-32, -32, 0]],
      width: 280,

      '$inverted &': {
        background: '#F7F7F7',
      },
    },
  },
});

@withStyles(styles)
class Elder extends Component {
  render() {
    const {
      name,
      picture,
      children,
      inverted,
      first,
      last,
      classes,
    } = this.props;

    return (
      <Container
        className={classnames(classes.root, {
          [classes.inverted]: inverted,
          [classes.first]: first,
          [classes.last]: last,
        })}
        md
      >
        {inverted && (
          <Parallax
            offsetYMax={20}
            offsetYMin={-20}
            styleInner={{
              background: '#F7F7F7',
              position: 'relative',
              width: '100%',
              height: '100%',
              left: 0,
              top: 0,
            }}
            styleOuter={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              left: 0,
              top: 0,
              zIndex: -1,
            }}
          />
        )}

        <div className={classes.inner}>
          <RevealQueue from={inverted ? 'right' : 'left'} name={name} speed={1}>
            <div className={classes.pictureWrapper}>
              <Image ratio="3/4" src={picture} />
            </div>
          </RevealQueue>
          <div className={classes.textWrapper}>
            <RevealQueue delay={0.5}>
              <div className={classes.title}>{name}</div>
              {children}
            </RevealQueue>
          </div>
        </div>
      </Container>
    );
  }
}

Elder.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.shape(),
  first: PropTypes.bool,
  inverted: PropTypes.bool,
  last: PropTypes.bool,
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
};

Elder.defaultProps = {
  classes: {},
  inverted: false,
  first: false,
  last: false,
};

export default Elder;
