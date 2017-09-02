import React, { Component } from "react";
import PropTypes from "prop-types";

export default class AudioPlayer extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired
  };

  render() {
    return (
      <audio
        controls
        preload="metadata"
        style={{ width: "100%", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
      >
        <source src={this.props.url} />
      </audio>
    );
  }
}
