import React, { Component, PropTypes } from 'react';

export default
class Overlay extends Component {
  static propTypes = {
    active: PropTypes.bool,
    onClicked: PropTypes.func,
  }

  static defaultProps = {
    active: false,
    onClicked: () => {},
  }

  render() {
    const styles = require('./Overlay.scss');

    const { active, onClicked } = this.props;

    return (
      <div
        className={`${styles.overlay} ${active ? styles.active : ''}`}
        onClick={() => onClicked()} />
    );
  }
}
