import React, { Component, PropTypes } from 'react';

import { Text, Hr } from 'components';

import styles from './PopButton.scss';

class PopButton extends Component {
  constructor() {
    super();

    this.state = {
      opened: false,
    };
  }

  open() {
    this.setState({ opened: true });
  }

  close() {
    this.setState({ opened: false });
  }

  render() {
    const { children, title } = this.props;
    const { opened } = this.state;

    return (
      <div className={`${styles.container} ${opened ? styles.opened : ''}`}>
        {opened ? (
          <div className={styles.content}>
            <div className={styles.closeButton} onClick={() => this.close()}>
              <Text className="fa fa-times" />
            </div>

            <Text fontWeight="bold">{title}</Text>
            <Hr lg line />
            {children}
          </div>
        ) : (
          <div className={styles.button} onClick={() => this.open()}>
            <span className="fa fa-tasks" />
          </div>
        )}
      </div>
    );
  }
}

PopButton.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
};

export default PopButton;
