import React from 'react';

import Container from 'components/Container/Container';
import Text from 'components/Text/Text';
import Hr from 'components/Hr/Hr';

const Wip = () => (
  <Container md>
    <Hr xl />
    <Text align="center" fontSize={3}>
      Work in progress...
    </Text>
    <Hr sm />
    <Text align="center">Patience, cette page sera bientôt prête !</Text>
    <Hr xl />
  </Container>
);

export default Wip;
