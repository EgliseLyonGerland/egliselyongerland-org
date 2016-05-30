import React from 'react';

import MediaQuery from 'react-responsive';
import Sticky from 'react-stickynode';

import { Sidebar } from 'components';

export default () => {
  const styles = require('./Header.scss');
  const logo = require('./logo.svg');
  const brand = require('./brand.svg');

  return (
    <Sticky>
      <div className={styles.header}>
        <img className={styles.logo} src={logo} />

        <MediaQuery minWidth={500} values={{ width: 1024 }}>
          <img className={styles.brand} src={brand} />
        </MediaQuery>

        <MediaQuery className={styles.links} minWidth={800} values={{ width: 1024 }}>
          <div className={styles.linksItem}>
            <a className={styles.link} href="">L'église</a>
            <span className={styles.linkCarret + ' fa fa-chevron-right'} />
          </div>
          <div className={styles.linksItem}>
            <a className={styles.link} href="">Prédications</a>
            <span className={styles.linkCarret + ' fa fa-chevron-right'} />
          </div>
          <div className={styles.linksItem}>
            <a className={styles.link} href="">Contact</a>
            <span className={styles.linkCarret + ' fa fa-chevron-right'} />
          </div>
        </MediaQuery>
        <Sidebar />
      </div>
    </Sticky>
  );
};
