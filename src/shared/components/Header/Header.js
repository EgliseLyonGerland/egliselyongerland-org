import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink as Link } from 'react-router-dom';
import classnames from 'classnames';
import EventListener, { withOptions } from 'react-event-listener';
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';

import Sidebar from 'components/Sidebar/Sidebar';
import Burger from 'components/Burger/Burger';
import routes from 'utils/routes';

import logo from './logo.svg';
import brand from './brand.svg';

const miniStyles = theme => ({
  transform: `scale(${theme.header.sticky.brandScale})
        translateX(${theme.header.sticky.brandTranslate}px)`,
});

const styles = theme => ({
  header: {
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
      background: '#111',
      height: theme.header.sticky.height,
    },
    '& $logo': {
      transform: 'rotate(180deg)',
    },
  },
  body: {
    position: 'absolute',
    width: '100%',
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
    marginRight: 20,
    transition: 'transform 0.5s',

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
    marginLeft: 35,
    zIndex: theme.sidebar.zindex + 1,
    display: 'none',
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
    marginLeft: 24,
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    textTransform: 'capitalize',
    fontSize: 16,
    fontWeight: theme.typography.fontWeights.medium,

    '&:hover': {
      textDecoration: 'underline',
    },
    '&:focus, &:visited': {
      color: 'white',
      textDecoration: 'none',
    },
  },
  [theme.breakpoints.down('sm')]: {
    brand: {
      ...miniStyles(theme),
    },
    body: {
      height: theme.header.mini.height,
      padding: [[0, 24]],
    },
    burger: {
      display: 'block',
    },
    links: {
      display: 'none',
    },
  },
  [theme.breakpoints.down('xs')]: {
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

        <div className={classes.body}>
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
    );
  }
}

export default Header;
