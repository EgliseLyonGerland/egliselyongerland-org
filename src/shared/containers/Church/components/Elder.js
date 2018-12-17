import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { rem } from 'polished';
import { Parallax } from 'react-scroll-parallax';
import classnames from 'classnames';

import Container from 'components/Container/Container';
import Image from 'components/Image/Image';
import RevealQueue from 'components/Animation/RevealQueue';

const styles = ({ typography, palette }) => ({
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
    marginBottom: 40,

    '&::after': {
      content: '""',
      display: 'block',
      width: 90,
      height: 1,
      backgroundColor: palette.primary[500],
      margin: [[32, 0, 0]],
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
});

@withStyles(styles)
class Elder extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.shape().isRequired,
    first: PropTypes.bool,
    inverted: PropTypes.bool,
    last: PropTypes.bool,
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  };

  static defaultProps = {
    inverted: false,
    first: false,
    last: false,
  };

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
          <div>
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

export default Elder;