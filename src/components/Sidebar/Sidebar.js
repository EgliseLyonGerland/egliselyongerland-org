import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router';

import classes from 'classnames';

import styles from './Sidebar.scss';

export default
class Sidebar extends Component {

  static propTypes = {
    links: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })),
    opened: PropTypes.bool,
    onOpenSidebarButtonClicked: PropTypes.func,
    onCloseSidebarButtonClicked: PropTypes.func,
  }

  static defaultProps = {
    opened: false,
    onOpenSidebarButtonClicked: () => {},
    onCloseSidebarButtonClicked: () => {},
  }

  toggle() {
    if (this.props.opened) {
      this.props.onCloseSidebarButtonClicked();
    } else {
      this.props.onOpenSidebarButtonClicked();
    }
  }

  render() {
    const { links, opened } = this.props;

    return (
      <div className={classes(styles.sidebar, (opened && styles.opened))}>
        <div className={styles.content}>
          {links.map(link =>
            <Link key={link.path} to={link.path} className={styles.link}>{link.label}</Link>
          )}
        </div>
      </div>
    );
  }
}
