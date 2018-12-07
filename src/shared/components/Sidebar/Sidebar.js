import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import rem from 'polished/lib/helpers/rem';

const styles = theme => ({
  wrapper: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: theme.sidebar.zindex,
    display: 'flex',
    alignItems: 'center',
    visibility: 'hidden',
    transition: 'visibility 0s 1s',
  },
  background: {
    position: 'absolute',
    background: theme.palette.primary[500],
    top: theme.header.mini.height / 2,
    right: theme.header.mini.height / 2,
    zIndex: theme.sidebar.zindex + 1,
    transition: 'transform',
    transitionDuration: '.6s',
    transitionTimingFunction: 'cubic-bezier(1, 0.25, 0.75, 1)',
    width: 'calc(200vw + 200vh)',
    height: 'calc(200vw + 200vh)',
    borderRadius: '100%',
    transform: 'translate(50%, -50%) scale(0)',
  },
  content: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: [[theme.header.height, '10vw']],
    zIndex: theme.sidebar.zindex + 2,
  },
  linkWrapper: {
    transition: 'transform 0.2s, opacity .2s',
    transitionTimingFunction: 'cubic-bezier(0.535, 0.010, 0.265, 1.550)',
    opacity: 0,
    transform: 'scale(0.9)',
  },
  link: {
    display: 'block',
    fontSize: '8vmin',
    fontWeight: theme.typography.fontWeights.bold,
    transition: 'transform 0.2s',
    transitionTimingFunction: 'cubic-bezier(0.535, 0.010, 0.265, 1.550)',

    '&:hover': {
      transform: 'scale(1.05)',
    },

    '&, &:active, &:visited': {
      color: 'white',
      textDecoration: 'none',
    },

    [theme.breakpoints.up('sm')]: {
      fontSize: rem(56),
    },
  },
  opened: {
    visibility: 'visible',
    transition: 'visibility 0s 0s',

    '& $background': {
      transform: 'translate(50%, -50%) scale(1)',
      transitionDuration: '1s',
      transitionTimingFunction: 'cubic-bezier(0.56, 0.34, 0, 1)',
    },
    '& $linkWrapper': {
      opacity: 1,
      transform: 'scale(1)',
    },
  },
});

class Sidebar extends Component {
  toggle() {
    const {
      opened,
      onCloseSidebarButtonClicked,
      onOpenSidebarButtonClicked,
    } = this.props;

    if (opened) {
      onCloseSidebarButtonClicked();
    } else {
      onOpenSidebarButtonClicked();
    }
  }

  render() {
    const { links, opened, classes } = this.props;

    return (
      <div className={classnames(classes.wrapper, opened && classes.opened)}>
        <div className={classes.background} />
        <div className={classes.content}>
          {links.map((link, index) => (
            <div
              key={link.path}
              className={classes.linkWrapper}
              style={{
                transitionDelay: `${index * 0.1 + (opened ? 0.4 : 0)}s`,
              }}
            >
              <Link className={classes.link} to={link.path}>
                {link.label}
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  classes: PropTypes.shape().isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onCloseSidebarButtonClicked: PropTypes.func,
  onOpenSidebarButtonClicked: PropTypes.func,
  opened: PropTypes.bool,
};

Sidebar.defaultProps = {
  opened: false,
  onOpenSidebarButtonClicked: () => {},
  onCloseSidebarButtonClicked: () => {},
};

export default withStyles(styles)(Sidebar);
