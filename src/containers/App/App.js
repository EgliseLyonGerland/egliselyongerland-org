import React, { Component, PropTypes } from 'react';

import Helmet from 'react-helmet';
import config from '../../config';
import { connect } from 'react-redux';
import * as displayActions from 'redux/modules/display';

import { Header, Search } from 'components';

@connect(
  state => ({
    searchVisibility: state.display.searchVisibility,
  }),
  displayActions
)
export default
class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    searchVisibility: PropTypes.string.isRequired,
    setSearchVisibility: PropTypes.func.isRequired,
    toggleSearchVisibility: PropTypes.func.isRequired,
  };

  render() {
    const styles = require('./App.scss');

    const {
      searchVisibility,
      toggleSearchVisibility,
      setSearchVisibility } = this.props;

    return (
      <div className={styles.app}>
        <Helmet {...config.app.head}/>
        <Header onSearchButtonClicked={() => toggleSearchVisibility()} />
        {this.props.children}
        <Search
          opened={searchVisibility === displayActions.SearchVisibilityStates.SHOW}
          hideButtonClicked={() => setSearchVisibility(displayActions.SearchVisibilityStates.HIDE)} />
      </div>
    );
  }
}
