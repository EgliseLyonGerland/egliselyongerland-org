import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router";
import classnames from "classnames";
import EventListener, { withOptions } from "react-event-listener";
import { withStyles } from "material-ui";

import { Sidebar, /* SearchButton, */ Burger, Container } from "components";
import routes from "utils/routes";

import logo from "./logo.svg";
import brand from "./brand.svg";

const styles = theme => ({
  header: {
    position: "fixed",
    top: 0,
    zIndex: theme.header.zindex,
    width: "100%",
    transition: "background 0.3s"
  },
  mini: {
    "& $brand": {
      transform: `scale(${theme.header.sticky.brandScale})
          translateX(${theme.header.sticky.brandTranslate}px)`
    }
  },
  sticky: {
    background: "#111",

    "& $body": {
      height: theme.header.sticky.height
    },
    "& $brand": {
      transform: `scale(${theme.header.sticky.brandScale})
          translateX(${theme.header.sticky.brandTranslate}px)`
    },
    "& $logo": {
      transform: "rotate(180deg)"
    }
  },
  body: {
    display: "flex",
    alignItems: "center",
    height: theme.header.height,
    padding: [[0, 30]],
    transition: "height 0.3s"
  },
  brand: {
    transition: "transform 0.3s",
    transformOrigin: "left center",
    position: "relative"
  },
  logo: {
    position: "relative",
    display: "inline-block",
    marginRight: 20,
    transition: "transform 0.5s",

    "&, & > img": {
      height: theme.header.logo.height
    }
  },
  betaMark: {
    display: "block",
    background: "#e83c3c",
    borderRadius: 3,
    color: "white",
    padding: [[2, 4]],
    position: "absolute",
    left: theme.header.logo.height - 16,
    top: 0,
    fontSize: 9,
    fontWeight: 400,
    lineHeight: "1em",
    width: 30,
    textAlign: "center",
    cursor: "default",
    textTransform: "uppercase"
  },
  title: {
    height: theme.header.brand.height,
    marginRight: 20
  },
  burger: {
    position: "relative",
    marginLeft: 35,
    zIndex: theme.sidebar.zindex + 1
  },
  search: {
    display: "none",
    marginLeft: 20
  },
  blankItem: {
    marginLeft: "auto"
  },
  links: {
    display: "flex",
    flexGrow: 0
  },
  linksItem: {
    flexGrow: 0,
    textAlign: "right",
    marginLeft: 20
  },
  link: {
    color: "white",
    textDecoration: "none",
    textTransform: "uppercase",
    fontWeight: theme.typography.fontWeights.normal,
    fontSize: 16,

    "&:hover": {
      textDecoration: "underline"
    },
    "&:focus, &:visited": {
      color: "white",
      textDecoration: "none"
    }
  }
});

const links = [
  {
    label: "L'église",
    path: routes.church()
  },
  {
    label: "Prédications",
    path: routes.sermons()
  },
  {
    label: "Blog",
    path: routes.blog()
  },
  {
    label: "Contact",
    path: routes.contact()
  }
];

const mapStateToProps = state => ({ browser: state.browser });

class Header extends Component {
  static propTypes = {
    browser: PropTypes.object.isRequired,
    sidebarOpened: PropTypes.bool,
    // onSearchButtonClicked: PropTypes.func.isRequired,
    onOpenSidebarButtonClicked: PropTypes.func.isRequired,
    onCloseSidebarButtonClicked: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      sticky: false
    };
  }

  componentDidUpdate() {
    this.handleScroll();
  }

  handleScroll() {
    const itemTranslate = !Math.min(0, window.scrollY - 30);

    if (this.state.sticky !== itemTranslate) {
      this.setState({
        sticky: itemTranslate
      });
    }
  }

  toggleSidebar() {
    if (this.props.sidebarOpened) {
      this.props.onCloseSidebarButtonClicked();
    } else {
      this.props.onOpenSidebarButtonClicked();
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
      onCloseSidebarButtonClicked
    } = this.props;

    const className = classnames(classes.header, {
      [classes.sticky]: sticky,
      [classes.mini]: sticky || browser.width <= 960
    });

    return (
      <div className={className}>
        <EventListener
          target="window"
          onResize={this.handleResize}
          onScroll={withOptions(() => this.handleScroll(), {
            passive: true,
            capture: false
          })}
        />

        <Container className={classes.body}>
          <div className={classes.brand}>
            <Link className={classes.logo} to="/">
              <img src={logo} alt="Église Lyon Gerland" />
            </Link>

            {browser.width >= 600 && (
              <Link to="/">
                <img
                  className={classes.title}
                  src={brand}
                  height="22"
                  alt="Église Lyon Gerland"
                />
              </Link>
            )}

            <div
              className={classes.betaMark}
              title="Ce site internet est en cours de perfectionnement. Il se peut que vous rencontriez des problèmes au cours de votre navigation et nous vous prions de nous en excuser."
            >
              beta
            </div>
          </div>

          <div className={classes.blankItem} />

          {browser.width >= 930 ? (
            <div className={classes.links}>
              {links.map((link, index) => (
                <div className={classes.linksItem} key={index}>
                  <Link className={classes.link} to={link.path}>
                    {link.label}
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <button
              className={classes.burger}
              onClick={() => this.toggleSidebar()}
            >
              <Burger
                weight={3}
                width={17}
                height={17}
                color="white"
                muted={sidebarOpened}
                rounded
              />
            </button>
          )}

          {/* <div className={classes.search}>
            <SearchButton onClicked={() => onSearchButtonClicked()} />
          </div> */}
        </Container>

        {browser.width < 930 && (
          <Sidebar
            links={links}
            opened={sidebarOpened}
            onOpenSidebarButtonClicked={() => onOpenSidebarButtonClicked()}
            onCloseSidebarButtonClicked={() => onCloseSidebarButtonClicked()}
          />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(connect(mapStateToProps)(Header));
