import React, { Component, PropTypes } from 'react';

import Helmet from 'react-helmet';
import config from '../../config';

import { Header } from 'components';

export default class App extends Component {

  static propTypes = {
    children: PropTypes.object.isRequired,
  }

  render() {
    const styles = require('./App.scss');

    return (
      <div className={styles.app}>
        <Helmet {...config.app.head}/>
        <Header />
        {this.props.children}
      </div>
    );
  }
}
