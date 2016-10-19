import React, { PropTypes } from 'react';

import { Text } from 'components';

import styles from './LabelPicker.scss';

const LabelPicker = ({ labels, current = null, children, onChange = () => {} }) => (
  <div>
    {labels.map(label => (
      <div
        className="clearfix"
        key={label.key}
        className={styles.label}
        onClick={() => onChange(label)}
      >
        <Text
          fontSize={1}
          className={`pull-right fa fa-toggle-${current === label.key ? 'on' : 'off'}`}
        />

        {children ? children(label) : (
          <Text fontSize={1} maxLines={1} ellipsis>{label.label}</Text>
        )}
      </div>
    ))}
  </div>
);

LabelPicker.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.any.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  current: PropTypes.any,
  children: PropTypes.func,
  onChange: PropTypes.func,
};

export default LabelPicker;
