import React, { Component } from "react";

import Text from "./Text";

import styles from "./H1.scss";

class H1 extends Component {
  render() {
    return (
      <Text
        className={styles.h1}
        fontSize={2}
        fontWeight="light"
        {...this.props}
      />
    );
  }
}

export default H1;
