import React, { Component } from "react";

import styles from "./Footer.scss";

class Footer extends Component {
  render() {
    return (
      <div className={styles.footer}>
        <span>Copyright © {new Date().getFullYear()} Église Lyon Gerland.</span>
      </div>
    );
  }
}

export default Footer;
