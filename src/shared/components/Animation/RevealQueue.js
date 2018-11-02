import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EventListener, { withOptions } from 'react-event-listener';

class RevealQueue extends Component {
  childRefs = [];

  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  state = {
    display: false,
  };

  componentDidMount() {
    this.handleScroll();
  }

  getTransitionStyle(index) {
    const { display } = this.state;

    if (display) {
      const delay = index * 0.2;

      return `transform .5s ${delay}s, opacity .5s ${delay}s, visibility 0s ${delay}s`;
    }

    const delay = (this.childRefs.length - index) * 0.1;

    return `transform .5s ${delay}s, opacity .5s ${delay}s, visibility 0s ${delay +
      0.5}s`;
  }

  handleScroll = () => {
    const screenHeight = window.screen.height;
    const { top } = this.childRefs[0].getBoundingClientRect();

    if (top < (screenHeight / 3) * 2) {
      this.show();
    } else {
      this.hide();
    }
  };

  show() {
    const { display } = this.state;

    if (!display) {
      this.setState({ display: true });
    }
  }

  hide() {
    const { display } = this.state;

    if (display) {
      this.setState({ display: false });
    }
  }

  render() {
    const { children } = this.props;
    const { display } = this.state;

    return (
      <>
        <EventListener
          target="window"
          onScroll={withOptions(() => this.handleScroll(), {
            passive: true,
            capture: false,
          })}
        />
        {React.Children.map(children, (child, index) =>
          React.cloneElement(child, {
            ...child.props,
            ref: ref => {
              this.childRefs[index] = ref;
            },
            style: {
              transition: this.getTransitionStyle(index),
              visibility: display ? 'visible' : 'hidden',
              transform: display ? 'none' : 'translateY(20px)',
              opacity: display ? 1 : 0,
            },
          }),
        )}
      </>
    );
  }
}

export default RevealQueue;
