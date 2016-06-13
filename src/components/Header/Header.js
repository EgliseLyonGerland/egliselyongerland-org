import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';

import { Link } from 'react-router';
import { Sidebar } from 'components';

@connect(
  state => { return { browser: state.browser }; }
)
export default
class Header extends Component {

  static propTypes = {
    browser: PropTypes.object.isRequired,
  }

  render() {
    const styles = require('./Header.scss');
    const logo = require('./logo.svg');
    const brand = require('./brand.svg');

    const links = [
      { label: 'L\'église' },
      { label: 'Prédications' },
      { label: 'Contact' },
    ];

    const { browser } = this.props;

    return (
      <div className={styles.header}>

        <Link to="/">
          <img className={styles.logo} src={logo} height="40" />
        </Link>

        {browser.width >= 500 && (
          <Link to="/">
            <img className={styles.brand} src={brand} height="22" />
          </Link>
        )}

        <div className={styles.blankItem} />

        {browser.width >= 800 && (
          <div className={styles.links}>
            {links.map((link, index) => {
              return (
                <div className={styles.linksItem} key={index}>
                  <a className={styles.link} href="">{link.label}</a>
                  <span className={styles.linkCarret + ' fa fa-chevron-right'} />
                </div>
              );
            })}
          </div>
        )}

        <Sidebar />
      </div>
    );
  }
}
