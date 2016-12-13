import React, { PropTypes, Component } from 'react';

import { connect } from 'react-redux';

import { Link } from 'react-router';
import { slice } from 'lodash';
import classes from 'classnames';

import { Sidebar, SearchButton, Burger, Container } from 'components';
import routes from 'utils/routes';

import styles from './Header.scss';
import logo from './logo.svg';
import brand from './brand.svg';

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

const mapStateToProps = state => ({ browser: state.browser });

class Header extends Component {
  static propTypes = {
    browser: PropTypes.object.isRequired,
    sidebarOpened: PropTypes.bool,
    onSearchButtonClicked: PropTypes.func.isRequired,
    onOpenSidebarButtonClicked: PropTypes.func.isRequired,
    onCloseSidebarButtonClicked: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.sidebarLinks = slice(links, 3);

    this.state = {
      transform: true,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll.bind(this));

    this.sidebarLinks = links;
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll.bind(this));
  }

  handleScroll(event) {
    const scrollTop = event.srcElement.body.scrollTop;
    const itemTranslate = Math.min(0, scrollTop - 60);

    this.setState({
      transform: itemTranslate
    });
  }

  toggleSidebar() {
    if (this.props.sidebarOpened) {
      this.props.onCloseSidebarButtonClicked();
    } else {
      this.props.onOpenSidebarButtonClicked();
    }
  }

  render() {
    const {
      transform
    } = this.state;

    const {
      browser,
      sidebarOpened,
      onSearchButtonClicked,
      onOpenSidebarButtonClicked,
      onCloseSidebarButtonClicked } = this.props;

    return (
      <div className={classes(styles.header, { [styles.foobar]: !transform })}>
        <Container className={styles.body}>
          <Link to="/">
            <img className={styles.logo} src={logo} height="40" alt="Église Lyon Gerland" />
          </Link>

          {browser.width >= 540 && (
            <Link to="/">
              <img className={styles.brand} src={brand} height="22" alt="Église Lyon Gerland" />
            </Link>
          )}

          <div className={styles.blankItem} />

          {browser.width >= 850 && (
            <div className={styles.links}>
              {slice(links, 0, 3).map((link, index) =>
                <div className={styles.linksItem} key={index}>
                  <Link className={styles.link} to={link.path}>{link.label}</Link>
                </div>
              )}
            </div>
          )}

          <div className={styles.search}>
            <SearchButton onClicked={() => onSearchButtonClicked()} />
          </div>

          <button className={styles.burger} onClick={() => this.toggleSidebar()}>
            <Burger weight={3} width={17} height={17} color="white" muted={sidebarOpened} rounded />
          </button>

        </Container>

        <Sidebar
          links={this.sidebarLinks}
          opened={sidebarOpened}
          onOpenSidebarButtonClicked={() => onOpenSidebarButtonClicked()}
          onCloseSidebarButtonClicked={() => onCloseSidebarButtonClicked()}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(Header);
