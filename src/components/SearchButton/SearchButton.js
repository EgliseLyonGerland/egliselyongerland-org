import React, { Component, PropTypes } from 'react';

export default
class SearchButton extends Component {

  static propTypes = {
    onClicked: PropTypes.func,
  }

  render() {
    const styles = require('./SearchButton.scss');

    const { onClicked } = this.props;

    return (
      <div className={styles.button} onClick={() => onClicked()}>
        <span className="fa fa-search" />
      </div>
    );
  }
}
