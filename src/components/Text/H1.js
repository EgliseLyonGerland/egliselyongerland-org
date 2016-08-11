import React from 'react';

import Text from './Text';

const H1 = (props) => (
  <Text
    fontSize={2}
    fontWeight="black"
    {...props}
  />
);

export default H1;
