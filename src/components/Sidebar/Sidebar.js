import React, {Component} from 'react';

import classes from 'classnames';

import { Burger } from 'components';

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
          <a className={styles.link} href="#">Contact</a>
        </div>
      </div>
    );
  }
}
