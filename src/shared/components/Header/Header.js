import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink as Link } from 'react-router-dom';
import classnames from 'classnames';
import EventListener, { withOptions } from 'react-event-listener';
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import loadable from 'react-loadable';

import Sidebar from 'components/Sidebar/Sidebar';
import Burger from 'components/Burger/Burger';
import Button from 'components/Button/Button';
import routes from 'utils/routes';

import logo from './logo.svg';
import brand from './brand.svg';

const Christmas = loadable({
  loader: () => import(/* webpackChunkName: "ChristmasHeader" */ './Christmas'),
  loading: () => <div />,
});

const miniStyles = theme => ({
  transform: `scale(${theme.header.sticky.brandScale})
        translateX(${theme.header.sticky.brandTranslate}px)`,
});

const styles = theme => ({
  root: {
    position: 'sticky',
    top: 0,
    zIndex: theme.header.zindex,
    width: '100%',
  },
  sticky: {
    '& $brand': {
      ...miniStyles(theme),
    },
    '& $body': {
      background: 'rgba(0, 0, 0, 0.95)',
      height: theme.header.sticky.height,
    },
    '& $christmas': {
      transform: `scale(${theme.header.sticky.brandScale})`,
    },
  },
  inner: {
    position: 'absolute',
    width: '100%',
  },
  body: {
    display: 'flex',
    alignItems: 'center',
    height: theme.header.height,
    padding: [[0, 48]],
    transition: 'height 0.3s, background 0.3s',
  },
  brand: {
    transition: 'transform 0.3s',
    transformOrigin: 'left center',
    position: 'relative',
  },
  logo: {
    position: 'relative',
    display: 'inline-block',
    marginRight: 16,

    '&, & > img': {
      height: theme.header.logo.height,
    },
  },
  title: {},
  titleImg: {
    height: theme.header.brand.height,
    marginRight: 20,
  },
  burger: {
    position: 'relative',
    marginLeft: 32,
    zIndex: theme.sidebar.zindex + 1,
    display: 'none',
  },
  blankItem: {
    marginLeft: 'auto',
  },
  links: {
    display: 'flex',
    color: 'white',
    flexGrow: 0,
  },
  linksItem: {
    flexGrow: 0,
    textAlign: 'right',
    marginRight: 24,
  },
  link: {
    position: 'relative',
    textDecoration: 'none',
    textTransform: 'capitalize',
    fontSize: 16,
    fontWeight: theme.typography.fontWeights.medium,
    color: 'inherit',
    display: 'flex',
    alignItems: 'center',

    '&:after': {
      position: 'absolute',
      content: '""',
      left: 0,
      bottom: -8,
      width: '100%',
      height: 2,
      background: 'white',
      transition: 'transform .2s',
      transform: 'scale(0, 1)',
      transformOrigin: 'center',
    },

    '&:focus, &:visited, &:hover': {
      color: 'inherit',
      textDecoration: 'none',
    },

    [theme.mixins.withHover]: {
      '&:hover': {
        '&:after': {
          transform: 'none',
        },
      },
    },
  },
  linkIcon: {
    marginRight: 8,
  },
  [theme.breakpoints.down('xs')]: {
    logo: {
      marginRight: 0,
    },
    brand: {
      ...miniStyles(theme),
    },
    body: {
      height: theme.header.mini.height,
      padding: [[0, 24]],
    },
    burger: {
      display: 'block',
      marginLeft: 16,
    },
    links: {
      display: 'none',
    },
    linksItem: {
      marginRight: 16,
    },
  },
  [theme.breakpoints.down(1100)]: {
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
    onOpenSidebarButtonClicked: PropTypes.func.isRequired,
    sidebarOpened: PropTypes.bool,
    width: PropTypes.string.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
  };

  static defaultProps = {
    sidebarOpened: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      sticky: false,
    };

    this.logoRef = React.createRef();
  }

  componentDidUpdate() {
    this.handleScroll();
  }

  handleScroll() {
    const { sticky } = this.state;

    this.logoRef.current.style.transform = `rotate(${Math.floor(
      window.scrollY / 4,
    )}deg)`;

    const shouldStick = !Math.min(0, window.scrollY - 30);
    if (sticky !== shouldStick) {
      this.setState({
        sticky: shouldStick,
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

    const isChristmasTimes = +new Date() < 1734303599000;

    const {
      width,
      classes,
      location,
      sidebarOpened,
      onOpenSidebarButtonClicked,
      onCloseSidebarButtonClicked,
    } = this.props;

    return (
      <div
        className={classnames(classes.root, {
          [classes.sticky]: sticky,
        })}
      >
        <EventListener
          target="window"
          onResize={this.handleResize}
          onScroll={withOptions(() => this.handleScroll(), {
            passive: true,
            capture: false,
          })}
        />

        <div className={classes.inner}>
          {isChristmasTimes && location.pathname !== '/noel' && (
            <Christmas sticky={sticky} />
          )}

          <div className={classes.body}>
            <div className={classes.brand}>
              <Link className={classes.logo} to="/">
                <img ref={this.logoRef} alt="Église Lyon Gerland" src={logo} />
              </Link>
              <Link className={classes.title} to="/">
                <img
                  alt="Église Lyon Gerland"
                  className={classes.titleImg}
                  src={brand}
                />
              </Link>
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

            <Button
              color="white"
              component={Link}
              size="xs"
              to={routes.donate()}
            >
              Faire un don
            </Button>

            <button
              className={classes.burger}
              mode="outlined"
              type="button"
              onClick={() => this.toggleSidebar()}
            >
              <Burger
                color="white"
                delay={[0.5, 0.8]}
                height={17}
                muted={sidebarOpened}
                rounded
                weight={3}
                width={17}
              />
            </button>
          </div>

          {isWidthDown('sm', width) && (
            <Sidebar
              links={links}
              opened={sidebarOpened}
              onCloseSidebarButtonClicked={() => onCloseSidebarButtonClicked()}
              onOpenSidebarButtonClicked={() => onOpenSidebarButtonClicked()}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Header;
