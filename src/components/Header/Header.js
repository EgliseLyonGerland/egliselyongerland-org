import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router";
import classes from "classnames";
import EventListener, { withOptions } from "react-event-listener";

import { Sidebar, /* SearchButton, */ Burger, Container } from "components";
import routes from "utils/routes";

import styles from "./Header.scss";
import logo from "./logo.svg";
import brand from "./brand.svg";

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
      sidebarOpened,
      // onSearchButtonClicked,
      onOpenSidebarButtonClicked,
      onCloseSidebarButtonClicked
    } = this.props;

    const className = classes(styles.header, {
      [styles.sticky]: sticky,
      [styles.mini]: sticky || browser.width <= 960
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

        <Container className={styles.body}>
          <div className={styles.brand}>
            <Link className={styles.logo} to="/">
              <img src={logo} alt="Église Lyon Gerland" />
            </Link>

            {browser.width >= 600 && (
              <Link to="/">
                <img
                  className={styles.title}
                  src={brand}
                  height="22"
                  alt="Église Lyon Gerland"
                />
              </Link>
            )}

            <div
              className={styles.betaMark}
              title="Ce site internet est en cours de perfectionnement. Il se peut que vous rencontriez des problèmes au cours de votre navigation et nous vous prions de nous en excuser."
            >
              beta
            </div>
          </div>

          <div className={styles.blankItem} />

          {browser.width >= 930 ? (
            <div className={styles.links}>
              {links.map((link, index) => (
                <div className={styles.linksItem} key={index}>
                  <Link className={styles.link} to={link.path}>
                    {link.label}
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <button
              className={styles.burger}
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

          {/* <div className={styles.search}>
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

export default connect(mapStateToProps)(Header);
