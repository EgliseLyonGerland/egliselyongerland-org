import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EventListener, { withOptions } from 'react-event-listener';

class RevealQueue extends Component {
  childRefs = [];

  static propTypes = {
    children: PropTypes.node.isRequired,
    delay: PropTypes.number,
    speed: PropTypes.number,
  };

  static defaultProps = {
    delay: 0,
    speed: 0.5,
  };

  state = {
    display: false,
  };

  componentDidMount() {
    this.handleScroll();
  }

  getDelay(index) {
    const { delay } = this.props;
    const { display } = this.state;

    if (display) {
      return index * 0.2 + delay;
    }

    return (this.childRefs.length - index) * 0.1 + delay;
  }

  getTransitionStyle(index) {
    const { speed } = this.props;
    const { display } = this.state;

    const delay = this.getDelay(index);
    const visibilityDeplay = display ? delay : delay + speed;

    const transform = `transform ${speed}s ${delay}s`;
    const opacity = `opacity ${speed}s ${delay}s`;
    const visibility = `visibility ${speed}s ${visibilityDeplay}s`;

    return `${transform}, ${opacity}, ${visibility}`;
  }

  handleScroll = () => {
    if (!this.childRefs[0]) {
      return;
    }

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
