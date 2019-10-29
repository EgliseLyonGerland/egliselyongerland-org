import React from 'react';

import Container from 'components/Container/Container';
import RevealQueue from 'components/Animation/RevealQueue';
import Typography from 'components/Typography/Typography';

const Wip = () => (
  <Container md>
    <RevealQueue delay={0.2}>
      <Typography align="center" gutterBottom variant="h5">
        Work in progress...
      </Typography>
      <Typography align="center" color="textSecondary">
        Patience, cette page sera bientôt prête !
      </Typography>
    </RevealQueue>
  </Container>
);

export default Wip;
