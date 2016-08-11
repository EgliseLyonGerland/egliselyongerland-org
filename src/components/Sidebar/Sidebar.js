import React, { Component, PropTypes } from 'react';

import { Link } from 'react-router';
import { Burger } from 'components';

import classes from 'classnames';

import styles from './Sidebar.scss';

export default
class Sidebar extends Component {

  static propTypes = {
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
    const { opened } = this.props;

    return (
      <div className={classes(styles.sidebar, (opened && styles.opened))}>
        <button className={styles.burger} onClick={() => this.toggle()}>
          <Burger weight={5} width={25} height={25} color="white" muted={opened} />
        </button>
        <div className={styles.content}>
          <a className={styles.link} href="#church">L'église</a>
          <a className={styles.link} href="#sermons">Prédications</a>
          <a className={styles.link} href="#youngs">Le groupe des jeunes</a>
          <Link to="/persecuted-church" className={styles.link}>L'église persécutée</Link>
          <a className={styles.link} href="#contact">Contact</a>
        </div>
      </div>
    );
  }
}
