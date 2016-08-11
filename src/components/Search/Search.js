import React, { Component, PropTypes } from 'react';

import styles from './Search.scss';

export default
class Search extends Component {

  static propTypes = {
    opened: PropTypes.bool,
    hideButtonClicked: PropTypes.func,
  }

  static defaultProps = {
    opened: false,
    hideButtonClicked: () => {},
  }

  constructor() {
    super();

    this.state = {
      search: '',
    };
  }

  componentDidUpdate() {
    if (this.props.opened) {
      this.input.focus();
    }
  }

  handleCloseBtn() {
    if (this.state.search.length > 0) {
      this.setState({ search: '' });
      return;
    }

    this.props.hideButtonClicked();
  }

  render() {
    const { opened } = this.props;
    const { search } = this.state;

    return (
      <div className={`${styles.search} ${opened ? styles.opened : ''}`}>
        <div className={styles.topbar}>
          <input
            className={styles.input}
            type="text"
            placeholder="Que recherchez-vous ?"
            ref={ref => { this.input = ref; }}
            value={this.state.search}
            onChange={evt => {
              this.setState({ search: evt.target.value });
            }}
          />

          <span className={styles.closeBtn} onClick={() => this.handleCloseBtn()}>&times;</span>
        </div>
        <div className={search.length === 0 ? styles.content : styles.contentOpened} />
      </div>
    );
  }
}
