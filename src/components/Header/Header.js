import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';

import { Link } from 'react-router';
import { Sidebar, SearchButton } from 'components';

@connect(
  state => { return { browser: state.browser }; }
)
export default
class Header extends Component {

  static propTypes = {
    browser: PropTypes.object.isRequired,
    sidebarOpened: PropTypes.bool,
    onSearchButtonClicked: PropTypes.func.isRequired,
    onOpenSidebarButtonClicked: PropTypes.func.isRequired,
    onCloseSidebarButtonClicked: PropTypes.func.isRequired,
  }

  render() {
    const styles = require('./Header.scss');
    // const logo = require('./logo.svg');
    const brand = require('./brand.svg');

    const links = [
      { label: 'L\'église' },
      { label: 'Prédications', path: '/blog/category/sermon' },
      { label: 'Blog', path: '/blog' },
    ];

    const {
      browser,
      sidebarOpened,
      onSearchButtonClicked,
      onOpenSidebarButtonClicked,
      onCloseSidebarButtonClicked } = this.props;

    return (
      <div className={styles.header}>

        {/*
        <Link to="/">
          <img className={styles.logo} src={logo} height="40" />
        </Link>
        */}

        {browser.width >= 0 && (
          <Link to="/">
            <img className={styles.brand} src={brand} height="22" />
          </Link>
        )}

        <div className={styles.blankItem} />

        {browser.width >= 850 && (
          <div className={styles.links}>
            {links.map((link, index) => {
              return (
                <div className={styles.linksItem} key={index}>
                  {link.path ? (
                    <Link className={styles.link} to={link.path}>{link.label}</Link>
                  ) : (
                    <a className={styles.link} href="">{link.label}</a>
                  )}
                  <span className={styles.linkCarret + ' fa fa-chevron-right'} />
                </div>
              );
            })}
          </div>
        )}

        <SearchButton onClicked={() => onSearchButtonClicked()} />

        <Sidebar
          opened={sidebarOpened}
          onOpenSidebarButtonClicked={() => onOpenSidebarButtonClicked()}
          onCloseSidebarButtonClicked={() => onCloseSidebarButtonClicked()} />
      </div>
    );
  }
}
