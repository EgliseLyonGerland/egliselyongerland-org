import React, { Component } from "react";

import styles from "./Footer.scss";

class Footer extends Component {
  render() {
    return (
      <div className={styles.footer}>
        Copyright © {new Date().getFullYear()} Église Lyon Gerland.
      </div>
    );
  }
}

export default Footer;
