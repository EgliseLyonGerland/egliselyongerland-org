import React, { Component } from "react";

import H1 from "./H1";

class H2 extends Component {
  render() {
    return <H1 fontSize={1.4} fontWeight="medium" {...this.props} />;
  }
}

export default H2;
