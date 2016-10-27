import React, { PropTypes } from 'react';

import { connect } from 'react-redux';

import { Link } from 'react-router';
import { slice, filter } from 'lodash';

import { Sidebar, SearchButton } from 'components';
import routes from 'utils/routes';

import styles from './Header.scss';
import logo from './logo.svg';
import brand from './brand.svg';

const mapStateToProps = state => ({ browser: state.browser });

const Header = (props) => {
  const links = [
    {
      label: 'L\'église',
      path: '/church',
    },
    {
      label: 'Prédications',
      path: routes.blog({ category: 1 }),
    },
    {
      label: 'Blog',
      path: routes.blog(),
    },
    {
      label: 'Groupe de jeune',
      path: '/youngs',
    },
    {
      label: 'L\'église persécutée',
      path: '/persecuted-church',
    },
    {
      label: 'Contact',
      path: '/contact',
    },
  ];

  const {
    browser,
    sidebarOpened,
    onSearchButtonClicked,
    onOpenSidebarButtonClicked,
    onCloseSidebarButtonClicked } = props;

  return (
    <div className={styles.header}>

      <Link to="/">
        <img className={styles.logo} src={logo} height="40" alt="Église Lyon Gerland" />
      </Link>

      {browser.width >= 500 && (
        <Link to="/">
          <img className={styles.brand} src={brand} height="22" alt="Église Lyon Gerland" />
        </Link>
      )}

      <div className={styles.blankItem} />

      {browser.width >= 850 && (
        <div className={styles.links}>
          {slice(links, 0, 3).map((link, index) =>
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
        links={filter(links, (link, index) => index >= 3 || browser.width < 850)}
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
