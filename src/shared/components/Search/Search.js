import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Search.scss';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      search: '',
    };
  }

  componentDidUpdate() {
    const { opened } = this.props;

    if (opened) {
      this.input.focus();
    }
  }

  handleCloseBtn() {
    const { hideButtonClicked } = this.props;
    const { search } = this.state;

    if (search.length > 0) {
      this.setState({ search: '' });
      return;
    }

    hideButtonClicked();
  }

  render() {
    const { opened } = this.props;
    const { search } = this.state;

    return (
      <div className={`${styles.search} ${opened ? styles.opened : ''}`}>
        <div className={styles.topbar}>
          <input
            ref={ref => {
              this.input = ref;
            }}
            className={styles.input}
            placeholder="Que recherchez-vous ?"
            type="text"
            value={search}
            onChange={evt => {
              this.setState({ search: evt.target.value });
            }}
          />

          <span
            className={styles.closeBtn}
            onClick={() => this.handleCloseBtn()}
          >
            &times;
          </span>
        </div>
        <div
          className={
            search.length === 0 ? styles.content : styles.contentOpened
          }
        />
      </div>
    );
  }
}

Search.propTypes = {
  hideButtonClicked: PropTypes.func,
  opened: PropTypes.bool,
};

Search.defaultProps = {
  opened: false,
  hideButtonClicked: () => {},
};

export default Search;
