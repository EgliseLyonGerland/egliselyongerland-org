import React, { Component, PropTypes } from 'react';

import { Link } from 'react-router';
import { Burger } from 'components';

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
        <button className={styles.burger} onClick={() => this.toggle()}>
          <Burger weight={5} width={25} height={25} color="white" muted={opened} />
        </button>
        <div className={styles.content}>
          {links.map(link =>
            <Link key={link.path} to={link.path} className={styles.link}>{link.label}</Link>
          )}
        </div>
      </div>
    );
  }
}
