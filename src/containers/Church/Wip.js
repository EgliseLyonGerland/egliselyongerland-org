import React, { Component } from "react";

import { Container, Text, Hr } from "components";

import styles from "./Wip.scss";

class Wip extends Component {
  render() {
    return (
      <Container md>
        <Hr xl />
        <Text align="center" fontSize={3}>
          Work in progress...
        </Text>
        <Hr sm />
        <Text align="center" align="center">
          Patience, cette page sera bientôt prête !
        </Text>
        <Hr xl />
      </Container>
    );
  }
}

export default Wip;
