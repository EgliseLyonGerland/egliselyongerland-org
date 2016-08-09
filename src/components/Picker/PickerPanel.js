import React, { Component, PropTypes } from 'react';

import { Text } from 'components';

import styles from './PickerPanel.scss';

export default
class PickerPanel extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    title: PropTypes.string,
  }

  render() {
    const { children, title } = this.props;

    return (
      <div className={styles.panel}>
        {title &&
          <div className={styles.title}>
            <Text fontSize={1} fontWeight="medium">{title}</Text>
          </div>
        }

        {children}
      </div>
    );
  }
}
