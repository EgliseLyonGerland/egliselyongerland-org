import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

const styles = theme => ({
  sidebar: {
    background: '#124765',
    color: 'white',
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    visibility: 'hidden',
    opacity: 0,
    transition: 'opacity 0.15s, visibility 0s 0.15s',
    transitionTimingFunction: 'ease-in-out',
    overflow: 'hidden',
    zIndex: theme.sidebar.zindex,
    display: 'flex',
  },
  opened: {
    transition: 'visibility 0s, opacity 0.15s',
    visibility: 'visible',
    opacity: 1,
  },
  content: {
    textAlign: 'center',
    margin: [[theme.header.height, 'auto']],
  },
  link: {
    display: 'block',
    color: 'white',
    fontWeight: theme.typography.fontWeights.regular,
    textDecoration: 'none',
    fontSize: 20,
    textTransform: 'uppercase',
    marginBottom: 10,
    transition: 'transform 0.2s',

    '&:hover': {
      transform: 'scale(1.05)',
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
      <div className={classnames(classes.sidebar, opened && classes.opened)}>
        <div className={classes.content}>
          {links.map(link => (
            <Link key={link.path} to={link.path} className={classes.link}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    }),
  ).isRequired,
  opened: PropTypes.bool,
  onOpenSidebarButtonClicked: PropTypes.func,
  onCloseSidebarButtonClicked: PropTypes.func,
  classes: PropTypes.shape().isRequired,
};

Sidebar.defaultProps = {
  opened: false,
  onOpenSidebarButtonClicked: () => {},
  onCloseSidebarButtonClicked: () => {},
};

export default withStyles(styles)(Sidebar);
