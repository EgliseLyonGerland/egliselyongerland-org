import React from 'react';

import { Container, Jumbotron, Hr } from 'components';

export default function NotFound() {
  return (
    <div>
      <Jumbotron />
      <Hr />
      <Container>
        <h1>Doh! 404!</h1>
        <p>These are <em>not</em> the droids you are looking for!</p>
      </Container>
    </div>
  );
}
