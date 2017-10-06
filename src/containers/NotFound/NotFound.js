import React, { Component } from "react";

import { keys } from "lodash";
import moment from "moment";

import { Container, Jumbotron, Text, Hr } from "components";

import verses from "./verses.json";

class NotFound extends Component {
  render() {
    const books = keys(verses);
    const index = parseInt(moment().format("DDD"), 10) % books.length;
    const book = books[index];
    const verse = verses[book];

    return (
      <div>
        <Jumbotron>
          <Container sm style={{ textAlign: "center" }}>
            <Text color="white" fontWeight="bold" fontSize={2}>
              {book}
            </Text>
            <Text color="white" fontSize={10} lineHeight={10} fontWeight="bold">
              40.4
            </Text>
            <Hr line width="50%" xl />
            <Text color="white" fontWeight="thin" fontSize={1.6} italic>
              “{verse}” — <small>{book} 40.4</small>
            </Text>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}

export default NotFound;
