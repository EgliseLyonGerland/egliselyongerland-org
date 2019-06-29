import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import EventListener, { withOptions } from 'react-event-listener';
import debounce from 'lodash/debounce';

class RevealQueue extends Component {
  childRefs = [];

  static propTypes = {
    children: PropTypes.node.isRequired,
    delay: PropTypes.number,
    from: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
    offset: PropTypes.number,
    speed: PropTypes.number,
  };

  static defaultProps = {
    delay: 0,
    speed: 0.5,
    offset: 90,
    from: 'top',
  };

  state = {
    display: false,
  };

  handleScroll = debounce(() => {
    if (!this.childRefs[0]) {
      return;
    }

    // eslint-disable-next-line react/no-find-dom-node
    const node = ReactDOM.findDOMNode(this.childRefs[0]);

    const { offset } = this.props;
    const { display } = this.state;
    const screenHeight = window.innerHeight;
    const { top } = node.getBoundingClientRect();

    if (!display && top < (screenHeight * offset) / 100) {
      this.show();
    } else if (display && top >= screenHeight) {
      this.hide();
    }
  }, 50);

  componentDidMount() {
    this.handleScroll();
  }

  getTransitionStyle(index) {
    const { speed, delay } = this.props;
    const { display } = this.state;

    if (!display) {
      return 'none';
    }

    const finalDelay = index * 0.2 + delay;

    const transform = `transform ${speed}s ${finalDelay}s`;
    const opacity = `opacity ${speed}s ${finalDelay}s`;
    const visibility = `visibility ${speed}s ${finalDelay}s`;

    return `${transform}, ${opacity}, ${visibility}`;
  }

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
    const { children, from } = this.props;
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
        {React.Children.map(children, (child, index) => {
          let transform;

          switch (from) {
            case 'top':
              transform = 'translateY(20px)';
              break;
            case 'bottom':
              transform = 'translateY(-20px)';
              break;
            case 'left':
              transform = 'translateX(-20px)';
              break;
            case 'right':
              transform = 'translateX(20px)';
              break;
            default:
          }

          return React.cloneElement(child, {
            ...child.props,
            ref: ref => {
              this.childRefs[index] = ref;
            },
            style: {
              ...child.props.style,
              transition: this.getTransitionStyle(index),
              visibility: display ? 'visible' : 'hidden',
              transform: display ? 'none' : transform,
              opacity: display ? 1 : 0,
            },
          });
        })}
      </>
    );
  }
}

export default RevealQueue;
