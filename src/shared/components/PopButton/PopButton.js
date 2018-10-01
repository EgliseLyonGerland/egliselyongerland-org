import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import FilterListIcon from '@material-ui/icons/FilterList';
import { withStyles } from '@material-ui/core/styles';

import Text from 'components/Text/Text';
import Hr from 'components/Hr/Hr';

const styles = theme => ({
  container: {
    position: 'fixed',
    background: theme.palette.primary[500],
    width: theme.popButton.size,
    height: theme.popButton.size,
    bottom: theme.popButton.margin,
    right: theme.popButton.margin,
    borderRadius: theme.popButton.size / 2,
    boxShadow: '0 0 7px rgba(0, 0, 0, 0.7)',
    transition: 'all 0.2s',
    zIndex: theme.popButton.zindex,
    overflow: 'auto',
  },
  content: {
    padding: theme.popButton.margin,
    visibility: 'hidden',
    opacity: 0,
    transition: 'visibility 0s linear 0.3s, opacity 0.2s',
  },

  opened: {
    background: 'white',
    width: `calc(100vw - ${theme.popButton.margin * 2}px)`,
    height: `calc(100vh - ${theme.popButton.margin * 2}px)`,
    borderRadius: 2,

    '& $content': {
      visibility: 'visible',
      opacity: 1,
      transitionDelay: 0,
    },
  },

  button: {
    width: theme.popButton.size,
    height: theme.popButton.size,
    textAlign: 'center',
    color: 'white',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  closeButton: {
    float: 'right',
    cursor: 'pointer',
  },
});

class PopButton extends Component {
  constructor() {
    super();

    this.state = {
      opened: false,
    };
  }

  open() {
    this.setState({ opened: true });
  }

  close() {
    this.setState({ opened: false });
  }

  render() {
    const { children, title, classes } = this.props;
    const { opened } = this.state;

    return (
      <div className={`${classes.container} ${opened ? classes.opened : ''}`}>
        {opened ? (
          <div className={classes.content}>
            <div className={classes.closeButton} onClick={() => this.close()}>
              <CloseIcon />
            </div>

            <Text fontWeight="medium">{title}</Text>
            <Hr lg line />
            {children}
          </div>
        ) : (
          <div className={classes.button} onClick={() => this.open()}>
            <FilterListIcon />
          </div>
        )}
      </div>
    );
  }
}

PopButton.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.shape().isRequired,
  title: PropTypes.string.isRequired,
};

export default withStyles(styles)(PopButton);
