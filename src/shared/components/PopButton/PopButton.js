import React, { Component } from "react";
import PropTypes from "prop-types";
import CloseIcon from "@material-ui/icons/Close";
import FilterListIcon from "@material-ui/icons/FilterList";

import { Text, Hr } from "components";

import styles from "./PopButton.scss";

class PopButton extends Component {
  constructor() {
    super();

    this.state = {
      opened: false
    };
  }

  open() {
    this.setState({ opened: true });
  }

  close() {
    this.setState({ opened: false });
  }

  render() {
    const { children, title } = this.props;
    const { opened } = this.state;

    return (
      <div className={`${styles.container} ${opened ? styles.opened : ""}`}>
        {opened ? (
          <div className={styles.content}>
            <div className={styles.closeButton} onClick={() => this.close()}>
              <CloseIcon />
            </div>

            <Text fontWeight="bold">{title}</Text>
            <Hr lg line />
            {children}
          </div>
        ) : (
          <div className={styles.button} onClick={() => this.open()}>
            <FilterListIcon />
          </div>
        )}
      </div>
    );
  }
}

PopButton.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired
};

export default PopButton;
