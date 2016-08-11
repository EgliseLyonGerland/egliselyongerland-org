import React, { PropTypes } from 'react';

import { connect } from 'react-redux';

import { Link } from 'react-router';
import { Sidebar, SearchButton } from 'components';

import styles from './Header.scss';
// import logo from './logo.svg';
import brand from './brand.svg';

const mapStateToProps = state => ({ browser: state.browser });

const Header = (props) => {
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
    onCloseSidebarButtonClicked } = props;

  return (
    <div className={styles.header}>

      {/*
      <Link to="/">
        <img className={styles.logo} src={logo} height="40" />
      </Link>
      */}

      {browser.width >= 0 && (
        <Link to="/">
          <img className={styles.brand} src={brand} height="22" alt="Église Lyon Gerland" />
        </Link>
      )}

      <div className={styles.blankItem} />

      {browser.width >= 850 && (
        <div className={styles.links}>
          {links.map((link, index) =>
            <div className={styles.linksItem} key={index}>
              {link.path ? (
                <Link className={styles.link} to={link.path}>{link.label}</Link>
              ) : (
                <a className={styles.link} href="">{link.label}</a>
              )}
              <span className={`${styles.linkCarret} fa fa-chevron-right`} />
            </div>
          )}
        </div>
      )}

      <SearchButton onClicked={() => onSearchButtonClicked()} />

      <Sidebar
        opened={sidebarOpened}
        onOpenSidebarButtonClicked={() => onOpenSidebarButtonClicked()}
        onCloseSidebarButtonClicked={() => onCloseSidebarButtonClicked()}
      />
    </div>
  );
};

Header.propTypes = {
  browser: PropTypes.object.isRequired,
  sidebarOpened: PropTypes.bool,
  onSearchButtonClicked: PropTypes.func.isRequired,
  onOpenSidebarButtonClicked: PropTypes.func.isRequired,
  onCloseSidebarButtonClicked: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Header);
