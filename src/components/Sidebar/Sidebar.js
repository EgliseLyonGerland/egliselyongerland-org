import React, { Component } from 'react';

import { Link } from 'react-router';
import { Burger } from 'components';

import classes from 'classnames';

export default
class Sidebar extends Component {

  constructor() {
    super();

    this.state = {
      opened: false,
    };
  }

  toggle() {
    this.setState({
      opened: !this.state.opened,
    });
  }

  render() {
    const styles = require('./Sidebar.scss');
    const { opened } = this.state;

    return (
      <div className={classes(styles.sidebar, (opened && styles.opened))}>
        <button className={styles.burger} onClick={() => this.toggle()}>
          <Burger weight={5} width={25} height={25} color="white" muted={opened} />
        </button>
        <div className={styles.content}>
          <a className={styles.link} href="#">L'église</a>
          <a className={styles.link} href="#">Prédications</a>
          <a className={styles.link} href="#">Le groupe des jeunes</a>
          <Link to="/persecuted-church" className={styles.link}>L'église persécutée</Link>
          <a className={styles.link} href="#">Contact</a>
        </div>
      </div>
    );
  }
}
