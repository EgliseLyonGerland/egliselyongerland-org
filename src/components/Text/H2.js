import React, {Component} from 'react';

import Text from './Text';

export default
class H2 extends Component {
  render() {
    return (
      <Text
        fontSize={1.8}
        fontWeight="bold"
        {...this.props} />
    );
  }
}
