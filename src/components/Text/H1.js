import React, {Component} from 'react';

import Text from './Text';

export default
class H1 extends Component {
  render() {
    return (
      <Text
        fontSize={2}
        fontWeight="black"
        {...this.props} />
    );
  }
}
