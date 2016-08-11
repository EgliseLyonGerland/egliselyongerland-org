import React, { PropTypes } from 'react';

import { Text } from 'components';

import styles from './PickerPanel.scss';

const PickerPanel = ({ children, title }) => (
  <div className={styles.panel}>
    {title &&
      <div className={styles.title}>
        <Text fontSize={1} fontWeight="medium">{title}</Text>
      </div>
    }

    {children}
  </div>
);

PickerPanel.propTypes = {
  children: PropTypes.any.isRequired,
  title: PropTypes.string,
};

export default PickerPanel;
