import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Text } from 'components';

import styles from './LabelPicker.scss';

class LabelPicker extends Component {
  static propTypes = {
    labels: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired,
    })).isRequired,
    current: PropTypes.any,
    children: PropTypes.func,
    readOnly: PropTypes.bool,
    crop: PropTypes.number,
    onChange: PropTypes.func,
  }

  constructor() {
    super();

    this.state = {
      opened: false,
    };
  }

  render() {
    const {
      labels,
      crop = null,
      current = null,
      readOnly = false,
      children,
      onChange = () => {}
    } = this.props;

    const {
      opened
    } = this.state;

    return (
      <div className={`${readOnly ? styles.readOnly : ''}`}>
        {labels.map((label, index) => {
          if (!opened && crop !== null && index >= crop) {
            return null;
          }

          return (
            <div
              key={label.key}
              className={[styles.label, 'clearfix'].join(' ')}
              onClick={() => !readOnly && onChange(label.key === current ? undefined : label.key)}
            >
              <Text
                fontSize={1}
                className={`pull-right fa fa-toggle-${current === label.key ? 'on' : 'off'}`}
              />

              {children ? children(label) : (
                <Text fontSize={1} maxLines={1} ellipsis>{label.label}</Text>
              )}
            </div>
          );
        })}

        {crop !== null && labels.length > crop && (
          <div
            className={`${styles.more} clearfix`}
            onClick={() => this.setState({ opened: !opened })}
          >
            <a>Afficher {opened ? 'moins' : 'plus'}</a>
          </div>
        )}
      </div>
    );
  }
}

export default LabelPicker;
