import React, { Component, PropTypes } from 'react';

import styles from './LabelPicker.scss';

import { Text } from 'components';

export default
class LabelPicker extends Component {
  static propTypes = {
    labels: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired,
    })).isRequired,
    current: PropTypes.string,
    onChange: PropTypes.func,
  }

  render() {
    const {
      labels,
      current = null,
      onChange = () => {},
    } = this.props;

    return (
      <div>
        {labels.map(label => {
          return (
            <div className="clearfix" key={label.key} className={styles.label} onClick={() => onChange(label)}>
              <Text fontSize={1} className={`pull-right fa fa-toggle-${current === label.key ? 'on' : 'off'}`} />
              <Text fontSize={1} maxLines={1} ellipsis>{label.label}</Text>
            </div>
          );
        })}
      </div>
    );
  }
}
