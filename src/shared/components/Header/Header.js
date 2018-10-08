import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink as Link } from 'react-router-dom';
import classnames from 'classnames';
import EventListener, { withOptions } from 'react-event-listener';
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';

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
  },
  brand: {
    transition: 'transform 0.3s',
    transformOrigin: 'left center',
    position: 'relative',
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
  title: {},
  titleImg: {
    height: theme.header.brand.height,
    marginRight: 20,
  },
  burger: {
    position: 'relative',
    marginLeft: 35,
    zIndex: theme.sidebar.zindex + 1,
    display: 'none',
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
  [theme.breakpoints.down('md')]: {
    brand: {
      ...miniStyles(theme),
    },
    body: {
      height: theme.header.mini.height,
    },
    burger: {
      display: 'block',
    },
    links: {
      display: 'none',
    },
  },
  [theme.breakpoints.down('sm')]: {
    title: {
      display: 'none',
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

@withStyles(styles)
@withWidth()
class Header extends Component {
  static propTypes = {
    classes: PropTypes.shape().isRequired,
    onCloseSidebarButtonClicked: PropTypes.func.isRequired,
    // onSearchButtonClicked: PropTypes.func.isRequired,
    onOpenSidebarButtonClicked: PropTypes.func.isRequired,
    sidebarOpened: PropTypes.bool,
    width: PropTypes.string.isRequired,
  };

  static defaultProps = {
    sidebarOpened: false,
  };

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
      width,
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
              delay={[0.5, 0.8]}
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

        {isWidthDown('md', width) && (
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

export default Header;
