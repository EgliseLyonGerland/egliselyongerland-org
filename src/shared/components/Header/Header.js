import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink as Link } from 'react-router-dom';
import classnames from 'classnames';
import EventListener, { withOptions } from 'react-event-listener';
import { withStyles } from '@material-ui/core/styles';

import Sidebar from 'components/Sidebar/Sidebar';
import Burger from 'components/Burger/Burger';
import Container from 'components/Container/Container';
import routes from 'utils/routes';

import logo from './logo.svg';
import brand from './brand.svg';

const miniStyles = theme => ({
  transform: `scale(${theme.header.sticky.brandScale})
        translateX(${theme.header.sticky.brandTranslate}px)`,
});

const styles = theme => ({
  header: {
    position: 'fixed',
    top: 0,
    zIndex: theme.header.zindex,
    width: '100%',
    transition: 'background 0.3s',
  },
  sticky: {
    background: '#111',

    '& $brand': {
      ...miniStyles(theme),
    },
    '& $body': {
      height: theme.header.sticky.height,
    },
    '& $logo': {
      transform: 'rotate(180deg)',
    },
  },
  body: {
    display: 'flex',
    alignItems: 'center',
    height: theme.header.height,
    padding: [[0, 30]],
    transition: 'height 0.3s',

    '@media (max-width: 929px)': {
      height: theme.header.mini.height,
    },
  },
  brand: {
    transition: 'transform 0.3s',
    transformOrigin: 'left center',
    position: 'relative',

    '@media (max-width: 929px)': {
      ...miniStyles(theme),
    },
  },
  logo: {
    position: 'relative',
    display: 'inline-block',
    marginRight: 20,
    transition: 'transform 0.5s',

    '&, & > img': {
      height: theme.header.logo.height,
    },
  },
  betaMark: {
    display: 'block',
    background: '#e83c3c',
    borderRadius: 3,
    color: 'white',
    padding: [[2, 4]],
    position: 'absolute',
    left: theme.header.logo.height - 16,
    top: 0,
    fontSize: 9,
    fontWeight: theme.typography.fontWeights.medium,
    lineHeight: '1em',
    width: 30,
    textAlign: 'center',
    cursor: 'default',
    textTransform: 'uppercase',
  },
  title: {
    '@media (max-width: 599px)': {
      display: 'none',
    },
  },
  titleImg: {
    height: theme.header.brand.height,
    marginRight: 20,
  },
  burger: {
    position: 'relative',
    marginLeft: 35,
    zIndex: theme.sidebar.zindex + 1,
    display: 'none',

    '@media (max-width: 929px)': {
      display: 'block',
    },
  },
  search: {
    display: 'none',
    marginLeft: 20,
  },
  blankItem: {
    marginLeft: 'auto',
  },
  links: {
    display: 'flex',
    flexGrow: 0,

    '@media (max-width: 929px)': {
      display: 'none',
    },
  },
  linksItem: {
    flexGrow: 0,
    textAlign: 'right',
    marginLeft: 16,
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    textTransform: 'capitalize',
    fontWeight: theme.typography.fontWeights.regular,
    fontSize: 16,

    '&:hover': {
      textDecoration: 'underline',
    },
    '&:focus, &:visited': {
      color: 'white',
      textDecoration: 'none',
    },
  },
});

const links = [
  {
    label: "L'église",
    path: routes.church(),
  },
  {
    label: 'Prédications',
    path: routes.sermons(),
  },
  {
    label: 'Blog',
    path: routes.blog(),
  },
  {
    label: 'Contact',
    path: routes.contact(),
  },
];

const mapStateToProps = state => ({ browser: state.browser });

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sticky: false,
    };
  }

  componentDidUpdate() {
    this.handleScroll();
  }

  handleScroll() {
    const { sticky } = this.state;
    const itemTranslate = !Math.min(0, window.scrollY - 30);

    if (sticky !== itemTranslate) {
      this.setState({
        sticky: itemTranslate,
      });
    }
  }

  toggleSidebar() {
    const {
      sidebarOpened,
      onCloseSidebarButtonClicked,
      onOpenSidebarButtonClicked,
    } = this.props;

    if (sidebarOpened) {
      onCloseSidebarButtonClicked();
    } else {
      onOpenSidebarButtonClicked();
    }
  }

  render() {
    const { sticky } = this.state;

    const {
      browser,
      classes,
      sidebarOpened,
      // onSearchButtonClicked,
      onOpenSidebarButtonClicked,
      onCloseSidebarButtonClicked,
    } = this.props;

    const className = classnames(classes.header, {
      [classes.sticky]: sticky,
    });

    return (
      <div className={className}>
        <EventListener
          target="window"
          onResize={this.handleResize}
          onScroll={withOptions(() => this.handleScroll(), {
            passive: true,
            capture: false,
          })}
        />

        <Container className={classes.body}>
          <div className={classes.brand}>
            <Link className={classes.logo} to="/">
              <img alt="Église Lyon Gerland" src={logo} />
            </Link>
            <Link className={classes.title} to="/">
              <img
                alt="Église Lyon Gerland"
                className={classes.titleImg}
                height="22"
                src={brand}
              />
            </Link>

            <div
              className={classes.betaMark}
              title="Ce site internet est en cours de perfectionnement. Il se peut que vous rencontriez des problèmes au cours de votre navigation et nous vous prions de nous en excuser."
            >
              beta
            </div>
          </div>

          <div className={classes.blankItem} />

          <div className={classes.links}>
            {links.map(link => (
              <div key={link.label} className={classes.linksItem}>
                <Link className={classes.link} to={link.path}>
                  {link.label}
                </Link>
              </div>
            ))}
          </div>

          <button
            className={classes.burger}
            type="button"
            onClick={() => this.toggleSidebar()}
          >
            <Burger
              color="white"
              height={17}
              muted={sidebarOpened}
              weight={3}
              width={17}
              rounded
            />
          </button>

          {/* <div className={classes.search}>
            <SearchButton onClicked={() => onSearchButtonClicked()} />
          </div> */}
        </Container>

        {browser.width < 930 && (
          <Sidebar
            links={links}
            opened={sidebarOpened}
            onCloseSidebarButtonClicked={() => onCloseSidebarButtonClicked()}
            onOpenSidebarButtonClicked={() => onOpenSidebarButtonClicked()}
          />
        )}
      </div>
    );
  }
}

Header.propTypes = {
  browser: PropTypes.shape().isRequired,
  classes: PropTypes.shape().isRequired,
  // onSearchButtonClicked: PropTypes.func.isRequired,
  onCloseSidebarButtonClicked: PropTypes.func.isRequired,
  onOpenSidebarButtonClicked: PropTypes.func.isRequired,
  sidebarOpened: PropTypes.bool,
};

Header.defaultProps = {
  sidebarOpened: false,
};

export default withStyles(styles)(connect(mapStateToProps)(Header));
