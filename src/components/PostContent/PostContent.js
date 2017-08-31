import React, { Component } from "react";
import PropTypes from "prop-types";
import classes from "classnames";

import { Text } from "components";

import styles from "./PostContent.scss";

export default class PostContent extends Component {
  static propTypes = {
    content: PropTypes.string.isRequired
  };

  render() {
    const { content } = this.props;

    return (
      <Text element="div" lineHeight={2.4} className={styles.text}>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </Text>
    );
  }
}
