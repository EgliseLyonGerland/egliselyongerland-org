import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Motion, spring } from 'react-motion';
import { findIndex, noop } from 'lodash';

import TabPicker from 'components/Picker/TabPicker';

const styles = {
  root: {
    width: '100%',
    whiteSpace: 'nowrap',
    overflowX: 'hidden',
  },
  pane: {
    width: '100%',
    whiteSpace: 'normal',
    display: 'inline-block',
    verticalAlign: 'top',
  },
};

const PanePicker = ({
  panes,
  current,
  height,
  tabBgColor,
  tabActiveBarColor,
  classes,
  onChange,
}) => {
  const currentPaneIndex = Math.max(0, findIndex(panes, ['key', current]));

  let paneStyles = {};

  if (height) {
    paneStyles = {
      height: `${height}px`,
      overflowY: 'auto',
    };
  }

  return (
    <div>
      <TabPicker
        activeBarColor={tabActiveBarColor}
        bgColor={tabBgColor}
        current={current}
        tabs={panes}
        onChange={tab => tab.active !== false && onChange(tab)}
      />

      <div className={classes.root}>
        <Motion
          defaultStyle={{ x: 0 }}
          style={{ x: spring(currentPaneIndex * 100) }}
        >
          {style => (
            <div style={{ transform: `translateX(${-style.x}%)` }}>
              {panes.map(pane => (
                <div key={pane.key} className={classes.pane} style={paneStyles}>
                  {pane.children}
                </div>
              ))}
            </div>
          )}
        </Motion>
      </div>
    </div>
  );
};

PanePicker.propTypes = {
  panes: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired,
      children: PropTypes.any,
      active: PropTypes.bool,
    }),
  ).isRequired,
  current: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  onChange: PropTypes.func,
  tabBgColor: PropTypes.string,
  tabActiveBarColor: PropTypes.string,
  height: PropTypes.number,
  classes: PropTypes.shape().isRequired,
};

PanePicker.defaultProps = {
  onChange: noop,
  tabBgColor: null,
  tabActiveBarColor: null,
  height: null,
};

export default withStyles(styles)(PanePicker);
